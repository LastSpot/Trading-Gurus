const pool = require('../db')

const adminSchema = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS adminstrator (
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            PRIMARY KEY (username, password)
        );
    `;
    try {
        await pool.query(sql)
        console.log('Successfully initialize admin schema.')
    } catch (error) {
        console.error(error)
    }
}

module.exports = { adminSchema }