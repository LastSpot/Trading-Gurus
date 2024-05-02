const pool = require("../db");
require("dotenv").config();
const format = require("pg-format");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// init ajv json schema validator for external api
const ajv = new Ajv();
addFormats(ajv);
const apiSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    required: ["meta", "data"],
    properties: {
        meta: {
            type: "object",
            required: ["last_updated_at"],
            properties: {
                last_updated_at: {
                    type: "string",
                    format: "date-time",
                },
            },
        },
        data: {
            type: "object",
            additionalProperties: {
                type: "object",
                required: ["code", "value"],
                properties: {
                    code: {
                        type: "string",
                    },
                    value: {
                        type: "number",
                    },
                },
            },
        },
    },
};
const validateApi = ajv.compile(apiSchema);

// Create pair
const createLatestPair = async (req, res) => {
    const { currency_A, currency_B, rate } = req.body;

    const pairCode = currency_A + currency_B;

    const sql = `INSERT INTO ${process.env.latest_table} VALUES($1, $2, $3, $4);`;

    const findSql = `SELECT * FROM ${process.env.latest_table} WHERE code = $1;`;

    try {
        foundPair = await pool.query(findSql, [pairCode]);
        if (foundPair.rows.legnth) {
            return res
                .status(400)
                .json({ error: "Latest currency pair already exists" });
        }

        await pool.query(sql, [pairCode, currency_A, currency_B, rate]);
        res.status(200).json({
            mssg: "Successfully created a latest currency pair",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all pairs
const getAllLatestPairs = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.latest_table};`;

    try {
        const allCurrencyPairs = await pool.query(sql);
        const content = allCurrencyPairs.rows;
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a pair
const getLatestPair = async (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM ${process.env.latest_table} WHERE code = $1;`;

    try {
        const currencyPair = await pool.query(sql, [id]);
        const content = currencyPair.rows;
        if (!content) {
            return res
                .status(404)
                .json({ mssg: "No such latest currency pair" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(404).json({ mssg: "No such latest currency pair" });
    }
};

// Delete a pair
const deleteLatestPair = async (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM ${process.env.latest_table} WHERE code = $1;`;

    try {
        await pool.query(sql, [id]);
        res.status(200).json({
            mssg: "Successfully deleted latest currency pair",
        });
    } catch (error) {
        res.status(404).json({ mssg: "No such latest currency pair" });
    }
};

// Update a pair
const updateLatestPair = async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;

    const sql = `UPDATE ${process.env.latest_table} SET rate = $1 WHERE code = $2;`;

    try {
        await pool.query(sql, [rate, id]);
        res.status(200).json({
            mssg: "Successfully updated latest currency pair",
        });
    } catch (error) {
        res.status(404).json({ mssg: "No such latest currency pair" });
    }
};

// Get all pairs
const getAllHistoricalPairs = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.historical_table};`;

    try {
        const allCurrencyPairs = await pool.query(sql);
        const content = allCurrencyPairs.rows;
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Update database with latest currencies from api
 * This updates all paired currencies of each given base currency
 *
 * top 10 traded pairs: EUR/USD, USD/JPY, GBP/USD, AUD/USD,
 * USD/CAD, USD/CHF, NZD/USD, EUR/JPY, GBP/JPY, EUR/GBP
 * unique currencies: EUR, USD, JPY, GBP, AUD, CAD, CHF, NZD,
 */
const updateCurrencies = async (req, res) => {
    // Optional list of comma-separated currency codes, default to all major pairs
    let currencies = req.body.currencies || "AUD,CAD,CHF,EUR,GBP,JPY,NZD,USD";
    // currencies = "USD,EUR";
    const latestRates = [];

    // get latest currencies
    currencies = currencies.split(",");
    for (const baseCode of currencies) {
        // base currency -> all paired quote currencies
        const apiRes = await _makeApiRequest(baseCode, currencies);
        console.log(await _getApiStatus());
        if (apiRes.status === "error") {
            res.status(500).json({ error: "External API request failed" });
            return;
        }
        const apiJson = apiRes.data;
        if (!validateApi(apiJson)) {
            console.log(apiJson);
            console.error(validateApi.errors);
            res.status(500).json({ error: "External API request failed" }); // Generic error for client
            return;
        }

        // get timestamp and format for sql ("2024-05-02T06:52:59Z" -> "2024-05-02 06:52:59")
        const timestamp = apiJson.meta.last_updated_at
            .slice(0, -1)
            .split("T")
            .join(" ");

        // update latest currencies
        for (const quoteCurrency of Object.values(apiJson.data)) {
            // skip self pairs
            const quoteCode = quoteCurrency.code;
            if (baseCode === quoteCode) continue;

            const code = baseCode + quoteCode;
            const rate = quoteCurrency.value;
            const dbRes = await _updateLatestPair(
                code,
                baseCode,
                quoteCode,
                rate
            );
            if (dbRes.status === "error") {
                res.status(500).json({
                    error: `Failed to update latest currency pair ${code}`,
                });
                return;
            }
            console.log(dbRes.mssg);
            latestRates.push([code, baseCode, quoteCode, rate, timestamp]);
        }

        // throttle api requests so big brother doesnt get mad
        await new Promise((res) => setTimeout(res, 100));
    }
    console.log("rates:", latestRates);

    // insert latest rates into to historical table
    const dbRes = await _addCurrencyPairs(latestRates);
    if (dbRes.status === "error") {
        res.status(500).json({
            error: "Failed to insert into historical table",
        });
    } else {
        console.log(dbRes.mssg);
        res.status(200).json({ mssg: "Successfully updated all currencies" });
    }
};

/**
 * Make GET request to fxapi/latest
 *
 * @param {string} baseCurrency e.g. "USD"
 * @param {string[]} currencies e.g. ["USD", "EUR", "JPY"]
 * @returns
 */
const _makeApiRequest = async (baseCurrency, currencies) => {
    // remove self pairs and convert back into comma-separated string
    const filtered = currencies
        .filter((code) => code != baseCurrency)
        .join(",");

    try {
        const url = new URL("https://api.fxapi.com/v1/latest");
        const apiKey = process.env.API_KEY;
        url.searchParams.append("apikey", apiKey);
        url.searchParams.append("base_currency", baseCurrency);

        if (filtered) {
            url.searchParams.append("currencies", filtered);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const data = await response.json();
        return { status: "success", data: data };
    } catch (error) {
        console.error("Error making API request,", error);
        return { status: "error", data: error }; // Generic error for client
    }
};

const _getApiStatus = async () => {
    const apiKey = process.env.API_KEY;
    const url = new URL("https://api.fxapi.com/v1/status");
    url.searchParams.append("apikey", apiKey);

    const response = await fetch(url.toString());
    return response.json();
};

// Update a pair
const _updateLatestPair = async (code, base, quote, rate) => {
    // if pair doesn't exist, insert it; else update pair
    const sql = `
    INSERT INTO ${process.env.latest_table} (code, base, quote, rate)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (code)
    DO UPDATE SET base = EXCLUDED.base, quote = EXCLUDED.quote, rate = EXCLUDED.rate;
    `;

    try {
        await pool.query(sql, [code, base, quote, rate]);
        return {
            status: "success",
            mssg: `Successfully updated latest pair ${code}`,
        };
    } catch (error) {
        console.error("Error updating latest pair,", error);
        return { status: "error", mssg: error };
    }
};

// Update a pair
const _addCurrencyPairs = async (values) => {
    const query = `INSERT INTO ${process.env.historical_table} (code, base, quote, rate, rate_timestamp) VALUES %L;`;
    const sql = format(query, values);

    try {
        await pool.query(sql);
        return {
            status: "success",
            mssg: `Successfully inserted ${values.length} rows into historical table`,
        };
    } catch (error) {
        console.error("Error inserting into historical table,", error);
        return { status: "error", mssg: error };
    }
};

module.exports = {
    createLatestPair,
    getAllLatestPairs,
    getLatestPair,
    deleteLatestPair,
    updateLatestPair,
    getAllHistoricalPairs,
    updateCurrencies,
};
