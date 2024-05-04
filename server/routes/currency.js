
const express = require('express') 
const {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair,
} = require('../controllers/currencyController');
const makeApiRequest = require('./fetch');

const router = express.Router();

// Create pair
router.post('/', createCurrencyPair);

// Get all pair
router.get('/', getAllCurrencyPairs);

// Get a pair
//This bitch the one random thing that dont work
router.get('/getPair/:id', getCurrencyPair);

// Delete a pair
router.delete('/:id', deleteCurrencyPair);

// Update a pair
router.patch('/:id', updateCurrencyPair);

router.get('/fetchApi', makeApiRequest);

module.exports = router;