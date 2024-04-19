const client = require('../db');
require("dotenv").config();

// Create pair
const createCurrencyPair = async (req, res) => {
    const { currency_A, currency_B, rate } = req.body;

    const pairCode = currency_A + currency_B;

    const sql = `INSERT INTO ${process.env.table} VALUES($1, $2, $3, $4);`;

    try {
        await client.query(sql, [pairCode, currency_A, currency_B, rate]);
        res.status(201).json({mssg: 'Successfully created a pair of currency'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get all pairs
const getAllCurrencyPairs = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.table};`;

    try {
        const allCurrencyPairs = await client.query(sql);
        const content = allCurrencyPairs.rows
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get a pair
const getCurrencyPair = async (req, res) => {
    const { id } = req.params; 

    const sql = `SELECT * FROM ${process.env.table} WHERE code = $1;`;

    try {
        const currencyPair = await client.query(sql, [id]);
        const content = currencyPair.rows;
        if (!content) {
            return res.status(404).json({mssg: 'No such currency pair'})
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'});
    }
}

// Delete a pair
const deleteCurrencyPair = async (req, res) => {
    const { id } = req.params; 

    const sql = `DELETE FROM ${process.env.table} WHERE code = $1;`;

    try {
        const currencyPair = await client.query(sql, [id]);
        res.status(200).json({mssg: 'Successfully delete currency pair'});
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'});
    }
}

// Update a pair
const updateCurrencyPair = async (req, res) => {
    const { id } = req.params;
    const{ rate } = req.body;

    const sql = `UPDATE ${process.env.table} SET rate = $1 WHERE code = $2;`;

    try {
        const currencyPair = await client.query(sql, [rate, id]);
        res.status(200).json({mssg: 'Successfully update currency pair'});
    } catch (error) {
        res.status(404).json({mssg: 'No such currency pair'});
    }
}

module.exports = {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair
}