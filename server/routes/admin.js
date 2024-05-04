const express = require('express')
const {
    loginAdmin,
    signupAdmin,
    getAllUsers
} = require('../controllers/admin')

const router = express.Router()

// login 
router.post('/login', loginAdmin)

// signpu
router.post('/signup', signupAdmin)

// get all users
router.get('/users', getAllUsers)

module.exports = router;