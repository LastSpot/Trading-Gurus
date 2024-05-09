import { useState, useEffect, useCallback } from "react";
import CurrencyInput from "./CurrencyInput";
import "../../styles.css";

const currencies = [
    { label: "EUR - Euro", value: "EUR" },
    { label: "USD - US Dollar", value: "USD" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "GBP - British Pound", value: "GBP" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "CHF - Swiss Franc", value: "CHF" },
    { label: "NZD - New Zealand Dollar", value: "NZD" },
];

export default function ConvertCurrency() {
    const [base, setBase] = useState(currencies[0].value);
    const [quote, setQuote] = useState(currencies[1].value);
    const [fee, setFee] = useState(0);
    const [optimalRate, setOptimalRate] = useState(0);
    const [optimalPath, setOptimalPath] = useState([]);
    const [directRate, setDirectRate] = useState(0);

    // called everytime base, quote, or fee changes. should change to only button onClick
    // also changing fee is buggy
    const convert = useCallback(() => {
        Promise.all([
            fetch(`/currency/convert/${base}/${quote}/${fee / 100000}`),
            fetch("/currency"),
        ])
            .then((res) => Promise.all(res.map((prom) => prom.json())))
            .then(([output, latestData]) => {
                const conversion = JSON.parse(output);
                setOptimalRate(conversion.optimal_rate);
                setOptimalPath(conversion.optimal_path);
                if (base === quote) {
                    setDirectRate(1);
                } else {
                    setDirectRate(
                        latestData.filter(
                            (pairs) => pairs.code === base + quote
                        )[0].rate
                    );
                }
            });
    }, [base, quote, fee]);

    useEffect(convert, [convert]);
    if (optimalPath.length === 0) {
        return <div>Loading...</div>;
    }

    const handleBaseChange = (event) => {
        const selectedValue = event.target.value;
        setBase(selectedValue);
    };

    const handleQuoteChange = (event) => {
        const selectedValue = event.target.value;
        setQuote(selectedValue);
    };

    const handleFeeChange = (event) => {
        const selectedValue = event.target.value;
        setFee(selectedValue);
    };

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="convertor">
                <label>Input Currency:</label>
                <select value={base} onChange={handleBaseChange}>
                    {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>End Currency:</label>
                <select value={quote} onChange={handleQuoteChange}>
                    {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Fee ($USD/100,000 units):</label>
                <input type="text" value={fee} onChange={handleFeeChange} />
            </div>
            <div className="converted-output">
                <div>Direct Rate: {directRate}</div>
                <div>
                    Optimal Rate:{" "}
                    {optimalRate > directRate ? optimalRate : directRate}
                </div>
                <div>
                    Optimal Path:{" "}
                    {optimalRate > directRate
                        ? optimalPath.join(" -> ")
                        : `${base} -> ${quote}`}
                </div>
                <div>
                    Difference:{" "}
                    {optimalRate > directRate ? optimalRate - directRate : 0}
                </div>
            </div>
        </div>
    );
}
