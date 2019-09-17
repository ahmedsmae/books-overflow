import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

import ConversioReatesActionTypes from './conversion-rates.types';
import {
  getConversionRatesSuccess,
  getConversionRatesFailure
} from './conversion-rates.action';

const API_KEY = '42239c254fee35afb648eecb9b1af5ef';

function* getRatesAsync() {
  try {
    const response = yield axios({
      method: 'get',
      url: 'http://data.fixer.io/api/latest?',
      params: {
        access_key: API_KEY,
        format: 1
      }
    });

    console.log(response.data.rates);

    yield put(getConversionRatesSuccess(response.data.rates));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getConversionRatesFailure(err.message));
  }
}

function* getRatesStart() {
  yield takeLatest(
    ConversioReatesActionTypes.GET_CONVERSION_RATES_START,
    getRatesAsync
  );
}

export default function* userSagas() {
  yield all([call(getRatesStart)]);
}
