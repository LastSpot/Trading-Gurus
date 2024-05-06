require("dotenv").config();
const pool = require("../db");
const jwt = require('jsonwebtoken')

const createToken = (login_username, role) => {
    return jwt.sign({login_username, role}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const loginUser = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `SELECT * FROM ${process.env.user_table} WHERE login_username = $1 AND login_password = $2 AND user_role = 'user';`

    try {
        await pool.query(sql, [login_username, login_password])
        const token = createToken(login_username, 'user')
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const signupUser = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2, 'user');`

    try {
        await pool.query(sql, [login_username, login_password])
        const token = createToken(login_username, 'user')
        res.status(200).json({login_username, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {
    loginUser,
    signupUser
}