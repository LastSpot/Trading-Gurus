import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import CurrencyExchangeRates from "./CurrencyExchangeRates";
import CurrencyInput from "../currency/CurrencyInput";

// EUR, USD, JPY, GBP, AUD, CAD, CHF, NZD,
const currencies = [
    { label: "USD - US Dollar", value: "USD" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "GBP - British Pound", value: "GBP" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "CHF - Swiss Franc", value: "CHF" },
    { label: "NZD - New Zealand Dollar", value: "NZD" },
];

/**
 * Observer
 */
export default function Dashboard(props) {
    // default to 5 most popular: EUR/USD, USD/JPY, GBP/USD, AUD/USD, USD/CAD
    // TODO: user can change pairs
    const [exchanges, setExchanges] = useState([
        "EURUSD",
        "USDJPY",
        "GBPUSD",
        "AUDUSD",
        "USDCAD",
    ]);
    const [currencyData, setCurrencyData] = useState([]);
    const [inputCurrency, setInputCurrency] = useState(currencies[0].value);
    const [outputCurrency, setOutputCurrency] = useState(currencies[1].value);
    const [inputAmount, setInputAmount] = useState(1);
    const [outputAmount, setOutputAmount] = useState(1);
    const [chartIdx, setChartIdx] = useState(0); // TODO: user can change chart

    // data: [{code, base, quote, rate, rate_timestamp}]
    useEffect(() => {
        Promise.all(
            exchanges.map((code) => fetch(`/currency/historical/${code}`))
        )
            .then((res) => Promise.all(res.map((pair) => pair.json())))
            .then((data) => {
                console.log("1", data);
                setCurrencyData(data);
            });
    }, []);
    // useEffect(() => {
    //     fetch(`/currency/historical/EURUSD`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("1", data);
    //             setCurrencyData(data);
    //         });
    // }, []);

    if (currencyData.length === 0) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    // const chartData = currencyData
    //     .map((dataPoint) => ({
    //         time: dataPoint.rate_timestamp.substring(0, 10),
    //         value: dataPoint.rate,
    //     }))
    //     .toSorted((a, b) => b.time < a.time);
    const chartData = currencyData.map((pair) =>
        pair
            .map((dataPoint) => {
                return {
                    time: dataPoint.rate_timestamp.substring(0, 10),
                    value: dataPoint.rate,
                };
            })
            .toSorted((a, b) => b.time < a.time)
    );
    console.log("3", currencyData);

    // TODO: when clicking on a bubble, change chart to that currency

    return (
        <div>
            <div>
                <label>Input Currency:</label>
                <CurrencyInput
                    amount={inputAmount}
                    currency={inputCurrency}
                    currencies={currencies.map((option) => option.value)}
                    onAmountChange={setInputAmount}
                    onCurrencyChange={setInputCurrency}
                />
            </div>
            <div>
                <label>Output Currency:</label>
                <CurrencyInput
                    amount={outputAmount}
                    currency={outputCurrency}
                    currencies={currencies.map((option) => option.value)}
                    onAmountChange={setOutputAmount}
                    onCurrencyChange={setOutputCurrency}
                />
            </div>
            <CurrencyExchangeRates exchanges={exchanges} />
            <ChartComponent data={chartData[chartIdx]}></ChartComponent>
        </div>
    );
}
