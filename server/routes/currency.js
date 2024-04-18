const express = require('express') 
const {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair
} = require('../controllers/currencyController');

const router = express.Router();

// Create pair
router.post('/:currency_A/:currency_B/:rate', createCurrencyPair);

// Get all pair
router.get('/', getAllCurrencyPairs);

// Get a pair
router.get('/:currency_A/:currency_B', getCurrencyPair);

// Delete a pair
router.delete('/:currency_A/:currency_B', deleteCurrencyPair);

// Update a pair
router.patch('/:currency_A/:currency_B/:rate', updateCurrencyPair);

module.exports = router;