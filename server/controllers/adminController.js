require("dotenv").config();
const pool = require("../db");

const createToken = (login_username, role) => {
    return jwt.sign({login_username, role}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const loginAdmin = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `SELECT * FROM ${process.env.user_table} WHERE login_username = $1 AND login_password = $2 AND user_role = 'admin';`

    try {
        await pool.query(sql, [login_username, login_password])
        const token = createToken(login_username, 'admin')
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const signupAdmin = async (req, res) => {
    const { login_username, login_password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2, 'admin');`

    try {
        await pool.query(sql, [login_username, login_password])
        const token = createToken(login_username, 'admin')
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const getAllUsers = async (req, res) => {
    const sql = `SELECT login_username, login_password FROM ${process.env.user_table} WHERE user_role = 'user';`

    const allUsers = await pool.query(sql)
    const content = allUsers.rows
    res.status(200).json(content)
}

module.exports = {
    loginAdmin,
    signupAdmin,
    getAllUsers
}