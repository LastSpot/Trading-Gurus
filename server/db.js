const { Client } = require('pg');
require("dotenv").config();

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST || 'localhost',
    port: 5432,
    database: process.env.DB
});

client.connect((err) => {
    if (err) {
        console.err('Connection error:', err.stack)
    } else {
        console.log('Connected.')
    }
})

module.exports = client;