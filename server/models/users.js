const pool = require('../db')

const userSchema = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users_table (
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            role VARCHAR(50) CHECK (role IN ('user', 'admin')),
            PRIMARY KEY (username, role)
        );
    `;
    try {
        await pool.query(sql)
        console.log('Successfully initialize users table.')
    } catch (error) {
        console.error(error)
    }
}

module.exports = { userSchema }