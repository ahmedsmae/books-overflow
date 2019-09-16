import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { getLatLng } from './public-items.utils';

import PublicItemsActionTypes from './public-items.types';
import {
  getAllPublicItemsSuccess,
  getAllPublicItemsFailure,
  searchItemsSuccess,
  searchItemsFailure
} from './public-items.actions';

function* getItemsAsync() {
  try {
    // get user lat lng
    const { latitude, longitude } = yield call(getLatLng);
    console.log(latitude, longitude);

    if (latitude && longitude) {
      const response = yield call(axios, {
        method: 'post',
        url: 'api/publicitems/all',
        data: { latitude, longitude }
      });

      yield put(getAllPublicItemsSuccess(response.data.items));
    }
  } catch (err) {
    yield put(getAllPublicItemsFailure(err.message));
  }
}

function* searchItemsAsync({ payload }) {
  console.log(payload);

  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/publicitems/searchitems',
      data: { ...payload }
    });

    yield put(searchItemsSuccess(response.data.items));
  } catch (err) {
    yield put(searchItemsFailure(err.message));
  }
}

function* getItemsStart() {
  yield takeLatest(
    PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_START,
    getItemsAsync
  );
}

function* searchItemsStart() {
  yield takeLatest(PublicItemsActionTypes.SEARCH_ITEMS_START, searchItemsAsync);
}

export default function* publicItemsSagas() {
  yield all([call(getItemsStart), call(searchItemsStart)]);
}
