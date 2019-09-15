import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { getLatLng, distance } from './public-items.utils';

import PublicItemsActionTypes from './public-items.types';
import {
  getAllPublicItemsSuccess,
  getAllPublicItemsFailure
} from './public-items.actions';

function* getItemsAsync() {
  try {
    const response = yield call(axios, {
      method: 'get',
      url: 'api/public/all'
    });

    const { books, collections } = response.data;
    // merge books and collections
    const allItems = [...books, ...collections];

    // get user lat lng
    const { latitude, longitude } = yield getLatLng();

    // calculate the distance of the item from the user and add it as a distance prop into the item itself
    for (let i = 0; i < allItems.length; i++) {
      const itemDistance = distance(
        latitude,
        longitude,
        allItems[i].latitude,
        allItems[i].longitude
      );
      allItems[i].distance = itemDistance;
    }

    // arrange the array from the closest to the farest
    allItems.sort((a, b) => (a.distance > b.distance ? 1 : -1));

    yield put(getAllPublicItemsSuccess(allItems));
  } catch (err) {
    yield put(getAllPublicItemsFailure(err.message));
  }
}

function* getItemsStart() {
  yield takeLatest(
    PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_START,
    getItemsAsync
  );
}

export default function* publicItemsSagas() {
  yield all([call(getItemsStart)]);
}
