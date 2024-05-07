import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import CurrencyExchangeRates from "./CurrencyExchangeRates";
import CurrencyDropdown from "../currency/CurrencyDropdown";

// EUR, USD, JPY, GBP, AUD, CAD, CHF, NZD,
const currencies = [
    { label: "AUDCAD", value: "AUDCAD" },
    { label: "AUDCHF", value: "AUDCHF" },
    { label: "AUDEUR", value: "AUDEUR" },
    { label: "AUDGBP", value: "AUDGBP" },
    { label: "AUDJPY", value: "AUDJPY" },
    { label: "AUDNZD", value: "AUDNZD" },
    { label: "AUDUSD", value: "AUDUSD" },
    { label: "CADCHF", value: "CADCHF" },
    { label: "CADEUR", value: "CADEUR" },
    { label: "CADGBP", value: "CADGBP" },
    { label: "CADJPY", value: "CADJPY" },
    { label: "CADNZD", value: "CADNZD" },
    { label: "CADUSD", value: "CADUSD" },
    { label: "CHFEUR", value: "CHFEUR" },
    { label: "CHFGBP", value: "CHFGBP" },
    { label: "CHFJPY", value: "CHFJPY" },
    { label: "CHFNZD", value: "CHFNZD" },
    { label: "CHFUSD", value: "CHFUSD" },
    { label: "EURGBP", value: "EURGBP" },
    { label: "EURJPY", value: "EURJPY" },
    { label: "EURNZD", value: "EURNZD" },
    { label: "EURUSD", value: "EURUSD" },
    { label: "GBPJPY", value: "GBPJPY" },
    { label: "GBPNZD", value: "GBPNZD" },
    { label: "GBPUSD", value: "GBPUSD" },
    { label: "JPYNZD", value: "JPYNZD" },
    { label: "JPYUSD", value: "JPYUSD" },
    { label: "NZDUSD", value: "NZDUSD" },
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
                <label>Exchange Pairs:</label>
                {/* TODO: Make this a checkbox dropdown so it matches currency bubbles */}
                <CurrencyDropdown
                    currency={inputCurrency}
                    currencies={currencies.map((option) => option.value)}
                    onCurrencyChange={setInputCurrency}
                />
            </div>
            <CurrencyExchangeRates exchanges={exchanges} />
            <ChartComponent data={chartData[chartIdx]}></ChartComponent>
        </div>
    );
}
