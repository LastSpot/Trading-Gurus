require("dotenv").config();
const pool = require('../db');

const createUser = async (req, res) => {
    const { username, password } = req.body

    const sql = `INSERT INTO ${process.env.user_table} VALUES ($1, $2);`

    try {
        await pool.query(sql, [username, password])
        res.status(200).json({mssg: 'Successfully create an user account'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllUser = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.user_table};`

    try {
        const users = await pool.query(sql)
        const content = users.rows
        res.status(200).json(content)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM ${process.env.user_table} WHERE username = $1;`

    try {
        const user = await pool.query(sql, [id])
        const content = user.rows
        res.status(200).json(content)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM ${process.env.user_table} WHERE username = $1;`

    try {
        await pool.query(sql, [id])
        res.status(200).json({mssg: 'Successfully delete user account'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    const sql = `UPDATE ${process.env.user_table} SET password = $2 WHERE username = $1;`

    try {
        await pool.query(sql, [id, password])
        res.status(200).json({mssg: "Successfully update user's password"})
    } catch (error) {
        res.status(400).status({error: error.message})
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUser
}