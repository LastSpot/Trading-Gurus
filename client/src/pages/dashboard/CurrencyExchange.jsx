import React from "react";
import "../../styles.css";
import useSWR from "swr";
// require("dotenv").config();

const CurrencyBubble = ({ currencyPair, rate }) => (
    <div className="currency-bubble">
        <p>{currencyPair} </p>
        <p>{rate} USD</p>
    </div>
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CurrencyExchangeRates = () => {
    const {
        // data: (code, base, quote, rate)
        data: currencyData,
        error,
        isValidating,
    } = useSWR(`http://localhost:8000/currency`, fetcher);

    // Handles error and loading state
    if (error) return <div className="failed">failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    // Sort data object by exchange rate (highest to lowest)
    const sortedData = Object.values(currencyData).sort((a, b) => b[3] - a[3]);

    // Select the top 5 currency pairs
    const topFive = sortedData.slice(0, 5);
    // console.log(topFive);

    const currencyPairs = topFive.map(
        (pair) => `${pair.base} to ${pair.quote}`
    );
    // console.log(currencyPairs);

    return (
        <div className="currency-exchange-rates">
            <h2>Exchange Rates</h2>
            <div
                className="currency-exchange-rates"
                style={{ display: "flex" }}
            >
                {currencyPairs.map((currencyPair, index) => (
                    <CurrencyBubble
                        key={index}
                        currencyPair={currencyPair}
                        rate={topFive[index].rate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CurrencyExchangeRates;
