const pool = require('./db')

// Create pair
const createCurrencyPair = async (req, res) => {
    const { currency_A, currency_B, rate } = req.body;

    const sql = `INSERT INTO ${process.env.DB} (currency_A, currency_B, rate) VALUES(?,?,?)`;

    const escapedCurrencyA = pool.escape(currency_A);
    const escapedCurrencyB = pool.escape(currency_B);
    const escapedRate = pool.escape(rate);

    try {
        await pool.query(sql, [escapedCurrencyA, escapedCurrencyB, escapedRate])
        res.status(200).json({mssg: 'Successfully created a pair of currency'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Get all pairs
const getAllCurrencyPairs = async (req, res) => {

}

// Get a pair
const getCurrencyPair = async (req, res) => {
    
}

// Delete a pair
const deleteCurrencyPair = async (req, res) => {
    
}

// Update a pair
const updateCurrencyPair = async (req, res) => {
    
}

module.exports = {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair
}