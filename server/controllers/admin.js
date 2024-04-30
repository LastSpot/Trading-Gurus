require("dotenv").config();
const pool = require('../db');

const createAdmin = async (req, res) => {
    const { username, password } = req.body

    const sql = `INSERT INTO ${process.env.admin_table} VALUES ($1, $2);`

    try {
        await pool.query(sql, [username, password])
        res.status(200).json({mssg: 'Successfully create an admin account'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllAdmin = async (req, res) => {
    const sql = `SELECT * FROM ${process.env.admin_table};`

    try {
        const admins = await pool.query(sql)
        const content = admins.rows
        res.status(200).json(content)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAdmin = async (req, res) => {
    const { id } = req.params

    const sql = `SELECT * FROM ${process.env.admin_table} WHERE username = $1;`

    try {
        const admin = pool.query(sql, [id])
        const content = admin.rows
        res.status(200).json(content)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteAdmin = async (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM ${process.env.admin_table} WHERE username = $1;`

    try {
        await pool.query(sql, [id])
        res.status(200).json({mssg: 'Successfully delete admin account'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateAdmin = async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    const sql = `UPDATE ${process.env.admin_table} SET password = $2 WHERE username = $1;`

    try {
        await pool.query(sql, [id, password])
        res.status(200).json({mssg: "Successfully update admin's password"})
    } catch (error) {
        res.status(400).status({error: error.message})
    }
}

module.exports = {
    createAdmin,
    getAllAdmin,
    getAdmin,
    deleteAdmin,
    updateAdmin
}