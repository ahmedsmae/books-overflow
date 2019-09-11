import { call, takeLatest, put, all } from 'redux-saga/effects';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import UserActionTypes from './current-user.types';
import {
  loadingUserSuccess,
  loadingUserFailure,
  signinUserSuccess,
  signinUserFailure,
  signupUserSuccess,
  signupUserFailure,
  signoutUserSuccess,
  signoutUserFailure
} from './current-user.actions';

function* signupUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/signup',
      data: { ...payload }
    });

    yield localStorage.setItem('token', response.data.token);

    yield put(signupUserSuccess(response.data.user));
  } catch (err) {
    yield put(signupUserFailure(err.message));
  }
}

function* signInUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/signin',
      data: { ...payload }
    });

    yield localStorage.setItem('token', response.data.token);

    yield put(signinUserSuccess(response.data.user));
  } catch (err) {
    yield put(signinUserFailure(err.message));
  }
}

function* loadingUserAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: 'api/users/auth'
    });

    yield put(loadingUserSuccess(response.data.user));
  } catch (err) {
    yield put(loadingUserFailure(err.message));
  }
}

function* signoutUserAsync() {
  try {
    yield call(setAuthToken);

    yield call(axios, {
      method: 'post',
      url: 'api/users/signout'
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

function* signupUserStart() {
  yield takeLatest(UserActionTypes.SIGNUP_USER_START, signupUserAsync);
}

function* signoutUserStart() {
  yield takeLatest(UserActionTypes.SIGNOUT_USER_START, signoutUserAsync);
}

export default function* userSagas() {
  yield all([
    call(loadingUserStart),
    call(signInUserStart),
    call(signupUserStart),
    call(signoutUserStart)
  ]);
}