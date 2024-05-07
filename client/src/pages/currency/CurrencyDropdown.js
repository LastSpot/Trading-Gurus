import PropTypes from "prop-types";
import "./currencyInput.css";

function CurrencyDropdown(props) {
    return (
        <div className="group">
            <select
                value={props.currency}
                onChange={(ev) => props.onCurrencyChange(ev.target.value)}
            >
                {props.currencies.map((currency) => (
                    <option value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

CurrencyDropdown.propTypes = {
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyDropdown;
