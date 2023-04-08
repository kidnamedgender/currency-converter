import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ConverterBlock from './components/Converter/ConverterBlock';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const currencies = useRef({});
  const allCurrencies = [];

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('https://www.cbr-xml-daily.ru/latest.js');

      currencies.current = { ...data.data.rates, RUB: 1 };
      onChangeToPrice(1);

      for (let key in currencies.current) {
        if (!allCurrencies.includes(key)) {
          allCurrencies.push(key);
        }
      }
    };
    getData();
  }, []);

  const [allCur] = useState(allCurrencies);

  const onChangeFromPrice = (value) => {
    const price = value / currencies.current[fromCurrency];
    const result = price * currencies.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const price = value / currencies.current[toCurrency];
    const result = price * currencies.current[fromCurrency];
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <ConverterBlock
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
        allCur={allCur}
      />
      <ConverterBlock
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
        allCur={allCur}
      />
    </div>
  );
}

export default App;
