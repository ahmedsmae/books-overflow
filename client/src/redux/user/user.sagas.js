import { call, takeLatest, put, all } from 'redux-saga/effects';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import UserActionTypes from './user.types';
import {
  loadingUserSuccess,
  loadingUserFailure,
  signinUserSuccess,
  signinUserFailure,
  registerUserSuccess,
  registerUserFailure,
  signoutUserSuccess,
  signoutUserFailure
} from './user.actions';

function* loadingUserAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/users/auth'
    });

    const { name, email, _id, joindate } = response.data;
    const user = { name, email, joindate, id: _id };

    yield put(loadingUserSuccess(user));
  } catch (err) {
    yield put(loadingUserFailure(err.message));
  }
}

function* registerUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/register',
      data: { ...payload }
    });

    const { name, email, _id, joindate } = response.data.user;
    const user = { name, email, joindate, id: _id };

    yield localStorage.setItem('token', response.data.token);

    yield put(registerUserSuccess(user));
  } catch (err) {
    yield put(registerUserFailure(err.message));
  }
}

function* signInUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/login',
      data: { ...payload }
    });

    const { name, email, _id, joindate } = response.data.user;
    const user = { name, email, joindate, id: _id };

    yield localStorage.setItem('token', response.data.token);

    yield put(signinUserSuccess(user));
  } catch (err) {
    yield put(signinUserFailure(err.message));
  }
}

function* signoutUserAsync() {
  try {
    yield call(setAuthToken);

    yield call(axios, {
      method: 'post',
      url: 'api/users/logout'
    });

    yield localStorage.removeItem('token');

    yield put(signoutUserSuccess());
  } catch (err) {
    yield put(signoutUserFailure(err.message));
  }
}

function* loadingUserStart() {
  yield takeLatest(UserActionTypes.LOADING_USER_START, loadingUserAsync);
}

function* signInUserStart() {
  yield takeLatest(UserActionTypes.SIGNIN_USER_START, signInUserAsync);
}

function* registerUserStart() {
  yield takeLatest(UserActionTypes.REGISTER_USER_START, registerUserAsync);
}

function* signoutUserStart() {
  yield takeLatest(UserActionTypes.SIGNOUT_USER_START, signoutUserAsync);
}

export default function* userSagas() {
  yield all([
    call(loadingUserStart),
    call(signInUserStart),
    call(registerUserStart),
    call(signoutUserStart)
  ]);
}
