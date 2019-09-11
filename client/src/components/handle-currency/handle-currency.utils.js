import axios from 'axios';

const API_KEY = '42239c254fee35afb648eecb9b1af5ef';

export const getCurrencyList = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://data.fixer.io/api/latest?',
        params: {
          access_key: API_KEY,
          format: 1
        }
      });
      const currencyList = Object.keys(response.data.rates).map(cur => ({
        value: cur.toLowerCase(),
        label: cur
      }));
      // console.log(currencyList);

      resolve(currencyList);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const getRate = (from, to) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://data.fixer.io/api/latest?',
        params: {
          access_key: API_KEY,
          format: 1,
          symbols: `${from},${to}`
        }
      });

      const rate = response.data.rates[to] / response.data.rates[from];
      // console.log(rate);

      resolve(rate);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
