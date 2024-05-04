require("dotenv").config();
const pool = require("../db");

const loginUser = async (req, res) => {
    const { username, password } = req.body

    const sql = `SELECT * FROM ${process.env.user_table} WHERE username = $1 AND password = $2 AND role = 'user';`

    try {
        const userLogin = await pool.query(sql, [username, password])
        const content = userLogin.rows

        localStorage.clear()
        localStorage.setItem('login', JSON.stringify(content))

        res.status(200).json(content)
    } catch (error) {
        res.status(400).json({error: 'Incorrect username or password'})
    }
};

const signupUser = async (req, res) => {
    const { username, password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2, 'user');`

    try {
        await pool.query(sql, [username, password])
        res.status(200).json({mssg: 'Successfully create an user account'})
    } catch (error) {
        res.status(500).json({error: 'Duplicate username'})
    }
};

module.exports = {
    loginUser,
    signupUser
}