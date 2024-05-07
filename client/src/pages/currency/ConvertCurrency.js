import { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";

export default function ConvertCurrency() {
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

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("EUR");
    const [rates, setRates] = useState([]);

    useEffect(() => {
        const data = {
            USD: 1.0, // Base currency (USD) has a rate of 1.0
            EUR: Math.random().toFixed(4), // Random rate between 0.5 and 1.5 (4 decimal places)
            GBP: Math.random().toFixed(4),
            JPY: Math.random().toFixed(4),
            CNY: Math.random().toFixed(4),
            AUD: Math.random().toFixed(4),
            CHF: Math.random().toFixed(4),
            CAD: Math.random().toFixed(4),
            MXN: Math.random().toFixed(4),
            BRL: Math.random().toFixed(4),
            RUB: Math.random().toFixed(4),
        };
        setRates(data);
    }, []);

    useEffect(() => {
        if (!!rates) {
            function init() {
                handleAmount1Change(1);
            }
            init();
        }
    }, [rates]);

    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
        setCurrency2(currency2);
    }
    return (
        <div>
            <h1>Currency Converter</h1>
            <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(rates)}
                amount={amount1}
                currency={currency1}
            />
            <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(rates)}
                amount={amount2}
                currency={currency2}
            />
        </div>
    );
}
