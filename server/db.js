const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DB,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err) => {
    if (err) {
        console.error('Connection error:', err.stack)
    } else {
        console.log('Connected to server.')
    }
})

module.exports = pool;