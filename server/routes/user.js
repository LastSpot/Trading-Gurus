const express = require('express')
const {
    createUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/user')

const router = express.Router()

// Create user
router.post('/', createUser);

// Get all user
router.get('/', getAllUser);

// Get a user
router.get('/:id', getUser);

// Delete an user
router.delete('/:id', deleteUser);

// Update a user
router.patch('/:id', updateUser);

module.exports = router;