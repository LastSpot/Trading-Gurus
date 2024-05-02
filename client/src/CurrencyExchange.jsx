import React from "react";
import "./styles.css";
const CurrencyBubble = ({ currencyPair, rate }) => (
  <div className="currency-bubble">
    <p>{currencyPair} </p>
    <p>{rate} USD</p>
  </div>
);

const CurrencyExchangeRates = () => {
  const data = {
    USD: 1.0, // Base currency (USD) has a rate of 1.0
    EUR: Math.random().toFixed(4), // Random rate between 0.5 and   1.5 (4 decimal places)
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

    // Sort data object by exchange rate (highest to lowest)
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);

    // Select the top 5 currency pairs
    const topFive = sortedData.slice(0, 5);

  const currencyPairs = topFive.map((pair) => `USD to ${pair[0]}`);

  return (
    <div className="currency-exchange-rates">
      <h2>Exchange Rates</h2>
      <div className="currency-exchange-rates" style={{ display: "flex" }}>
        {currencyPairs.map((currencyPair, index) => (
          <CurrencyBubble
            key={index}
            currencyPair={currencyPair}
            rate={topFive[index][1]}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrencyExchangeRates;
