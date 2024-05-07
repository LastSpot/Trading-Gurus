const express = require("express");
const {
    createLatestPair,
    getAllLatestPairs,
    getLatestPair,
    deleteLatestPair,
    updateLatestPair,
    getAllHistoricalPairs,
    getHistoricalPair,
    updateCurrencies,
    convertCurrencies,
} = require("../controllers/currencyController");
// const makeApiRequest = require("./fetch");

const router = express.Router();

// Create pair
router.post("/", createLatestPair);

// Get all pair
router.get("/", getAllLatestPairs);

// Get a pair
//This bitch the one random thing that dont work
router.get("/getPair/:id", getLatestPair);

// Delete a pair
router.delete("/:id", deleteLatestPair);

// Update a pair
router.patch("/:id", updateLatestPair);

// Get all historical pair
router.get("/historical", getAllHistoricalPairs);

// Get a historical pair
router.get("/historical/:id", getHistoricalPair);

// Update all currencies
router.get("/update", updateCurrencies);

// Convert currencies
router.get("/convert/:base/:quote/:fee", convertCurrencies);

module.exports = router;
