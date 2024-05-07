import React, { useState } from 'react';
import ChartComponent from "../TradingViewChart";
import CurrencyExchangeRates from "../CurrencyExchange";
import CurrencyInput from "../CurrencyInput"; // Import CurrencyInput component

const currencyOptions = [
    { label: 'USD - US Dollar', value: 'USD' },
    { label: 'CAD - Canadian Dollar', value: 'CAD' },
    { label: 'JPY - Japanese Yen', value: 'JPY' },
    { label: 'GBP - British Pound', value: 'GBP' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'AUD - Australian Dollar', value: 'AUD' },
    { label: 'CNY - Chinese Yuan', value: 'CNY' },
    { label: 'RUB - Russian Ruble', value: 'RUB' },
    { label: 'BRL - Brazilian Real', value: 'BRL' },
    { label: 'CHF - Swiss Franc', value: 'CHF' },
    { label: 'MXN - Mexican Peso', value: 'MXN' },
];

export default function Dashboard() {
    const initialData = [
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 27.32 },
        { time: "2018-12-26", value: 25.17 },
        { time: "2018-12-27", value: 28.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 },
    ];

    const [inputCurrency, setInputCurrency] = useState(currencyOptions[0].value);
    const [endCurrency, setEndCurrency] = useState(currencyOptions[1].value);

    const handleInputCurrencyChange = (value) => {
        setInputCurrency(value);
    };

    const handleEndCurrencyChange = (value) => {
        setEndCurrency(value);
    };

    return (
        <div className="dashboard">
            <div>
                <label>Input Currency:</label>
                {/* Use CurrencyInput for selecting input currency */}
                <CurrencyInput
                    amount={1}
                    currency={inputCurrency}
                    currencies={currencyOptions.map(option => option.value)}
                    onAmountChange={() => {}}
                    onCurrencyChange={handleInputCurrencyChange}
                />
            </div>
            <div>
                <label>End Currency:</label>
                {/* Use CurrencyInput for selecting end currency */}
                <CurrencyInput
                    amount={1}
                    currency={endCurrency}
                    currencies={currencyOptions.map(option => option.value)}
                    onAmountChange={() => {}}
                    onCurrencyChange={handleEndCurrencyChange}
                />
            </div>
            <CurrencyExchangeRates inputCurrency={inputCurrency} endCurrency={endCurrency} />
            <ChartComponent data={initialData}></ChartComponent>
        </div>
    );
}
