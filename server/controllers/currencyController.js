const pool = require('../db');

// Create pair
const createCurrencyPair = async (req, res) => {
    const { currency_A, currency_B, rate } = req.body;

    const sql = `INSERT INTO ${process.env.DB} (currency_A, currency_B, rate) VALUES($1,$2,$3);`;

    try {
        await pool.query(sql, [currency_A, currency_B, rate]);
        res.status(201).json({mssg: 'Successfully created a pair of currency'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get all pairs
const getAllCurrencyPairs = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.DB};`;

    try {
        const allCurrencyPairs = await pool.query(sql);
        res.status(200).json(allCurrencyPairs);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get a pair
const getCurrencyPair = async (req, res) => {
    const { currency_A, currency_B } = req.params; 

    const sql = `SELECT * FROM ${process.env.DB} WHERE currency_A = ? AND currency_B = ?;`;

    const escapedCurrencyA = pool.escape(currency_A);
    const escapedCurrencyB = pool.escape(currency_B);

    try {
        const currencyPair = await pool.query(sql, [escapedCurrencyA, escapedCurrencyB])
        res.status(200).json(currencyPair)
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'})
    }
}

// Delete a pair
const deleteCurrencyPair = async (req, res) => {
    const { currency_A, currency_B } = req.params; 

    const sql = `DELETE FROM ${process.env.DB} WHERE currency_A = ? AND currency_B = ?;`;

    const escapedCurrencyA = pool.escape(currency_A);
    const escapedCurrencyB = pool.escape(currency_B);

    try {
        const currencyPair = await pool.query(sql, [escapedCurrencyA, escapedCurrencyB])
        res.status(200).json(currencyPair)
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'})
    }
}

// Update a pair
const updateCurrencyPair = async (req, res) => {
    const { currency_A, currency_B, rate } = req.params; 

    const sql = `UPDATE ${process.env.DB} SET rate = ? WHERE currency_A = ? AND currency_B = ?;`;

    const escapedCurrencyA = pool.escape(currency_A);
    const escapedCurrencyB = pool.escape(currency_B);
    const escapedRate = pool.escape(rate);

    try {
        const currencyPair = await pool.query(sql, [escapedCurrencyA, escapedCurrencyB, escapedRate])
        res.status(200).json(currencyPair)
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'})
    }
}

module.exports = {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair
}