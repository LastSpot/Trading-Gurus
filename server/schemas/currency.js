const pool = require("../db");

const currencySchema = async () => {
    /**
     * code: pair code ('USDEUR') -- PLEASE ENSURE BASE IS BEFORE QUOTE
     * base: base code ('USD')
     * quote: quote code ('EUR')
     * rate: exchange rate (1.5294002358)
     * rate_timestamp: timestamp of rate ('2024-05-02 06:52:59')
     */
    const sql = `
        CREATE TABLE IF NOT EXISTS latest_currency (
            code VARCHAR(6) UNIQUE,
            base VARCHAR(3) NOT NULL,
            quote VARCHAR(3) NOT NULL,
            rate FLOAT NOT NULL,
            PRIMARY KEY (code)
        );
        CREATE TABLE IF NOT EXISTS historical_currency (
            code VARCHAR(6) NOT NULL,
            base VARCHAR(3) NOT NULL,
            quote VARCHAR(3) NOT NULL,
            rate FLOAT NOT NULL,
            rate_timestamp TIMESTAMP NOT NULL,
            PRIMARY KEY (code, rate_timestamp)
        );
    `;
    try {
        await pool.query(sql);
        console.log("Successfully initialize currency schema");
    } catch (error) {
        console.error(error);
    }
};

module.exports = { currencySchema };
