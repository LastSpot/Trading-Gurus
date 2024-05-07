const pool = require("../db");

const userSchema = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users_table (
            login_username VARCHAR(100) NOT NULL,
            login_password VARCHAR(100) NOT NULL,
            user_role VARCHAR(50) CHECK (user_role IN ('user', 'admin')),
            PRIMARY KEY (login_username, user_role)
        );
    `;
    try {
        await pool.query(sql);
        console.log("Successfully initialize users table.");
    } catch (error) {
        console.error(error);
    }
};

module.exports = { userSchema };
