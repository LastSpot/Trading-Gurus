require("dotenv").config();
const pool = require("../db");

const loginUser = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `SELECT * FROM ${process.env.user_table} WHERE login_username = $1 AND login_password = $2 AND user_role = 'user';`

    try {
        const userLogin = await pool.query(sql, [login_username, login_password])
        const content = userLogin.rows

        // localStorage.clear()
        // localStorage.setItem('login', JSON.stringify(content))

        res.status(200).json(content)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const signupUser = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2, 'user');`

    try {
        await pool.query(sql, [login_username, login_password])
        res.status(200).json({mssg: 'Successfully create an user account'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {
    loginUser,
    signupUser
}