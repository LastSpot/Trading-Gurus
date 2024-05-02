const pool = require("../db");

const userSchema = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS clients (
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            PRIMARY KEY (username, password)
        );
    `;
    try {
        await pool.query(sql);
        console.log("Successfully initialize users schema.");
    } catch (error) {
        console.error(error);
    }
};

module.exports = { userSchema };
