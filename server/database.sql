CREATE DATABASE currency_exchange;

CREATE TABLE currency (
    code VARCHAR(50) UNIQUE,
    currency_A VARCHAR(50) NOT NULL,
    currency_B VARCHAR(50) NOT NULL,
    rate FLOAT NOT NULL,
    PRIMARY KEY (currency_A, currency_B)
);