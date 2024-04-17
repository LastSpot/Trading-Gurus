const Pool = require('pg').Pool
require("dotenv").config();

const pool = new Pool({
    user: process.env.USER || 'postgres',
    password: process.env.PASSWORD || '123456789',
    host: process.env.HOST || 'localhost',
    port: 5432,
    database: process.env.DB || 'currency_exchange'
});

module.exports = pool;