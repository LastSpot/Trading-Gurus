const express = require("express");
const {
    createLatestPair,
    getAllLatestPairs,
    getLatestPair,
    deleteLatestPair,
    updateLatestPair,
    getAllHistoricalPairs,
    updateCurrencies,
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

// Get all pair
router.get("/historical", getAllHistoricalPairs);

router.get("/update", updateCurrencies);

module.exports = router;
