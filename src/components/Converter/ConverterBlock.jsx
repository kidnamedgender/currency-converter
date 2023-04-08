import { useEffect, useState, useRef } from 'react';
import cls from './ConverterBlock.module.scss';

function ConverterBlock({ currency, onChangeValue, value, onChangeCurrency, allCur }) {
  const [isClicked, setIsClicked] = useState(false);
  const [actualCur, setActualCur] = useState(['RUB', 'USD', 'GBP', 'UAH']);

  const popupRef = useRef();

  const onChangeCurrencyOnMore = (arrCurrency) => {
    setActualCur(() => [arrCurrency, ...actualCur.slice(0, 3)]);
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const clickOuterHandler = (e) => {
      if (!e.path.includes(popupRef.current)) {
        setIsClicked(false);
      }
    };
    document.body.addEventListener('click', clickOuterHandler);
    return () => {
      document.body.removeEventListener('click', clickOuterHandler);
    };
  }, [isClicked]);

  return (
    <div className={cls.wrapper}>
      <div className={cls.block}>
        <div className={cls.currencies}>
          <ul>
            <div>
              {actualCur.map((arrCurrency) => (
                <li
                  key={arrCurrency}
                  onClick={() => onChangeCurrency(arrCurrency)}
                  style={
                    currency === arrCurrency ? { color: 'white', backgroundColor: '#16B67F' } : null
                  }>
                  {arrCurrency}
                </li>
              ))}
            </div>
            <li
              style={isClicked ? { color: 'white', backgroundColor: '#16B67F' } : {}}
              onClick={(e) => {
                setIsClicked(!isClicked);
                e.stopPropagation();
              }}>
              ↓
            </li>
            <div
              ref={popupRef}
              className={cls.moreCur}
              style={isClicked ? {} : { display: 'none' }}>
              {allCur
                .filter((cur) => !actualCur.includes(cur))
                .sort((a, b) => a.localeCompare(b))
                .map((arrCurrency) => (
                  <li
                    key={arrCurrency}
                    onClick={() => {
                      onChangeCurrency(arrCurrency);
                      onChangeCurrencyOnMore(arrCurrency);
                    }}
                    style={
                      currency === arrCurrency
                        ? { color: 'white', backgroundColor: '#16B67F' }
                        : null
                    }>
                    {arrCurrency}
                  </li>
                ))}
            </div>
          </ul>
        </div>
        <input
          onChange={(e) => onChangeValue(e.target.value)}
          type="number"
          value={value}
          placeholder="0"
          min="0"
        />
      </div>
    </div>
  );
}

export default ConverterBlock;
