
const express = require('express') 
const {
    createCurrencyPair,
    getAllCurrencyPairs,
    getCurrencyPair,
    deleteCurrencyPair,
    updateCurrencyPair,
} = require('../controllers/currencyController');


const router = express.Router();
const {
    makeApiRequest
} = require('./fetch');

// Create pair
router.post('/', createCurrencyPair);

// Get all pair
router.get('/', getAllCurrencyPairs);

// Get a pair
router.get('/:id', getCurrencyPair);

// Delete a pair
router.delete('/:id', deleteCurrencyPair);

// Update a pair
router.patch('/:id', updateCurrencyPair);

router.get('/fetchApi',makeApiRequest)

module.exports = router;