import { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";

const currencyOptions = [
    { label: "USD - US Dollar", value: "USD" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "GBP - British Pound", value: "GBP" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "CHF - Swiss Franc", value: "CHF" },
    { label: "NZD - New Zealand Dollar", value: "NZD" },
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

    const [inputCurrency, setInputCurrency] = useState(
        currencyOptions[0].value
    );
    const [endCurrency, setEndCurrency] = useState(currencyOptions[1].value);
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        // Fetch exchange rates based on input and end currencies
        const fetchExchangeRates = async () => {
            try {
                // Simulate fetching exchange rates from an API
                // Replace this with your actual API call
                const response = await fetch(
                    `https://api.example.com/exchange-rates?input=${inputCurrency}&end=${endCurrency}`
                );
                const data = await response.json();
                setExchangeRates(data);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        fetchExchangeRates();
    }, [inputCurrency, endCurrency]);

    const handleInputCurrencyChange = (event) => {
        const selectedValue = event.target.value;
        setInputCurrency(selectedValue);
    };

    const handleEndCurrencyChange = (event) => {
        const selectedValue = event.target.value;
        setEndCurrency(selectedValue);
    };

    return (
        <div className="dashboard">
            <div>
                <label>Input Currency:</label>
                <select
                    value={inputCurrency}
                    onChange={handleInputCurrencyChange}
                >
                    {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>End Currency:</label>
                <select value={endCurrency} onChange={handleEndCurrencyChange}>
                    {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {/* <CurrencyExchangeRates inputCurrency={inputCurrency} endCurrency={endCurrency} exchangeRates={exchangeRates} />
            <ChartComponent data={initialData}></ChartComponent> */}
        </div>
    );
}
