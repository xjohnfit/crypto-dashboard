import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {

    const currencies = ['BTC', 'ETC', 'USD', 'XRP', 'LTC', 'ADA'];
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0)

    console.log(amount);

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: chosenPrimaryCurrency,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: chosenSecondaryCurrency
            },
            headers: {
                'X-RapidAPI-Key': '46e4600040msh2fc1496a0ac3011p147823jsn2ca935ec8b45',
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)

        }).catch((error) => { console.error(error) })
    }
    console.log(exchangeRate)

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency:</td>
                            <td><input
                                type="number"
                                name="currency-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            /></td>
                            <td>
                                <select value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency:</td>
                            <td><input
                                type="number"
                                name="currency-2"
                                value={result}
                                disabled={true}
                            /></td>
                            <td>
                                <select value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate 
                exchangeRate={exchangeRate}
                chosenPrimaryCurrency={chosenPrimaryCurrency}
                chosenSecondaryCurrency={chosenSecondaryCurrency}
            />
        </div>
    );
}

export default CurrencyConverter;