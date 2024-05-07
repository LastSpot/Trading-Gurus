import React, { useState } from 'react';
import ChartComponent from "../TradingViewChart";
import CurrencyExchangeRates from "../CurrencyExchange";

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

    const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0].value);

    const handleCurrencyChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCurrency(selectedValue);
    };

    return (
        <div className="dashboard">
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
                {currencyOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <CurrencyExchangeRates currency={selectedCurrency} />
            <ChartComponent data={initialData}></ChartComponent>
        </div>
    );
}
