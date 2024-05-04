require("dotenv").config();
const pool = require('../db');

const loginAdmin = async (req, res) => {
    const { username, password } = req.body

    const sql = `SELECT * FROM ${process.env.user_table} WHERE username = $1 and password = $2 AND role = 'admin';`

    try {
        const adminLogin = await pool.query(sql, [username, password])
        const content = adminLogin.rows

        localStorage.clear()
        localStorage.setItem('login', JSON.stringify(content))

        res.status(200).json(content)
    } catch (error) {
        res.status(400).json({mssg: 'Incorrect username or password'})
    }
}

const signupAdmin = async (req, res) => {
    const { username, password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2, 'admin');`

    try {
        await pool.query(sql, [username, password])
        res.status(200).json({mssg: 'Successfully create an admin account'})
    } catch (error) {
        res.status(500).json({error: 'Duplicate username'})
    }
}

const getAllUsers = async (req, res) => {
    const sql = `SELECT username, password FROM ${process.env.user_table} WHERE role = 'user';`

    const allUsers = await pool.query(sql)
    const content = allUsers.rows
    res.status(200).json(content)
}

module.exports = {
    loginAdmin,
    signupAdmin,
    getAllUsers
}