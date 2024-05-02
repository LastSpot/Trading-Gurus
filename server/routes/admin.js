const express = require("express");
const {
    createAdmin,
    getAllAdmin,
    getAdmin,
    deleteAdmin,
    updateAdmin,
} = require("../controllers/admin");

const router = express.Router();

// Create admin
router.post("/", createAdmin);

// Get all admin
router.get("/", getAllAdmin);

// Get a admin
router.get("/:id", getAdmin);

// Delete an admin
router.delete("/:id", deleteAdmin);

// Update a admin
router.patch("/:id", updateAdmin);

module.exports = router;
