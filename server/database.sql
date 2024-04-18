CREATE DATABASE currency_exchange;

CREATE TABLE currency (
    currency_A VARCHAR(50),
    currency_B VARCHAR(50),
    rate FLOAT,
    PRIMARY KEY (currency_A, currency_B)
);