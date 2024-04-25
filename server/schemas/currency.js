const pool = require('../db')

const currencySchema = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS currency (
            code VARCHAR(50) UNIQUE,
            currency_A VARCHAR(50) NOT NULL,
            currency_B VARCHAR(50) NOT NULL,
            rate FLOAT NOT NULL,
            PRIMARY KEY (currency_A, currency_B)
        );
    `;
    try {
        await pool.query(sql)
        console.log('Successfully initialize currency schema')
    } catch (error) {
        console.error(error)
    }
}

module.exports = { currencySchema }