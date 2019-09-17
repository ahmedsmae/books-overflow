import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import SelectedUserActionTypes from './selected-user.types';
import {
  getSelectedUserSuccess,
  getSelectedUserFailure
} from './selected-user.actions';

function* getUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'get',
      url: 'api/users/getuser/' + payload
    });

    let user = response.data.user;
    user.items = response.data.items;

    yield put(getSelectedUserSuccess(user));
  } catch (err) {
    yield put(getSelectedUserFailure(err.message));
  }
}

function* getUserStart() {
  yield takeLatest(
    SelectedUserActionTypes.GET_SELECTED_USER_START,
    getUserAsync
  );
}

export default function* selectedUserSagas() {
  yield all([call(getUserStart)]);
}
