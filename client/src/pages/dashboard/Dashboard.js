import React, { useState } from "react";
import useSWR from "swr";
import ChartComponent from "./TradingViewChart";
import CurrencyExchangeRates from "./CurrencyExchangeRates";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * Observer
 */
export default function Dashboard() {
    const [exchanges, setExchanges] = useState(["USDEUR"]);
    const [inputCurrency, setInputCurrency] = useState("USD");
    const [outputCurrency, setOutputCurrency] = useState("EUR");

    let {
        // data: (code, base, quote, rate)
        data: currencyData,
        error,
        isValidating,
    } = useSWR(`http://localhost:3000/currency/historical/USDEUR`, fetcher);
    console.log(currencyData);

    // Handles error and loading state
    if (error) return <div className="failed">failed to load</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    const chartData = currencyData
        .map((pair) => ({
            time: pair.rate_timestamp.substring(0, 10),
            value: pair.rate,
        }))
        .toSorted((a, b) => b.time < a.time);
    // console.log(chartData);

    return (
        <div>
            <CurrencyExchangeRates />
            <ChartComponent data={chartData}></ChartComponent>
        </div>
    );
}
