import React, { useState } from "react";
import "../../styles.css";
import useSWR from "swr";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const CurrencyBubble = ({ currencyPair, rate }) => (
    <div className="currency-bubble">
        <p>{currencyPair} </p>
        <p>
            {rate} {currencyPair.substring(3)}
        </p>
    </div>
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 *
 * @param {string[]} props.exchanges currency code e.g. "USDEUR"
 * @returns
 */
const CurrencyExchangeRates = ({ exchanges }) => {
    const [curBubble, setCurBubble] = useState("");
    const {
        // data: (code, base, quote, rate)
        data: latestData,
        error,
        isValidating,
    } = useSWR(`/currency`, fetcher);

    // Handles error and loading state
    if (error) return <div className="failed">failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    // filter desired exchanges
    const currencyPairs = latestData.filter((pair) =>
        exchanges.includes(pair.code)
    );

    // Sort data object by exchange rate (highest to lowest)
    // const sortedData = Object.values(latestData).sort((a, b) => b[3] - a[3]);

    // Select the top 5 currency pairs
    // const topFive = sortedData.slice(0, 5);

    // const currencyPairs = currencyData.map(
    //     (pair) => `${pair.base} to ${pair.quote}`
    // );

    return (
        <div className="currency-exchange-rates">
            <h2>Exchange Rates</h2>
            <div
                className="currency-exchange-rates"
                style={{ display: "flex" }}
            >
                {currencyPairs.map((pair, index) => (
                    <CurrencyBubble
                        key={index}
                        currencyPair={pair.code}
                        rate={pair.rate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CurrencyExchangeRates;
