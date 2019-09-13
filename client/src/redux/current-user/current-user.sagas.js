import { call, takeLatest, put, all } from 'redux-saga/effects';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import { dataURLtoFile } from './current-user.utils';

import UserActionTypes from './current-user.types';
import {
  loadingUserSuccess,
  loadingUserFailure,
  signinUserSuccess,
  signinUserFailure,
  signupUserSuccess,
  signupUserFailure,
  signoutUserSuccess,
  signoutUserFailure,
  editUserProfileSuccess,
  editUserProfileFailure,
  editBookSuccess,
  editBookFailure
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

function* editUserProfileAsync({ payload }) {
  const { source, ...otherInfo } = payload;
  try {
    yield call(setAuthToken);

    const fd = yield new FormData();
    const file = yield dataURLtoFile(source, 'userImage.png');
    fd.append('avatar', file, file.name);
    yield call(axios.post, 'api/avatars/setavatar', fd);

    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/profile',
      data: { ...otherInfo }
    });

    yield put(editUserProfileSuccess(response.data.user));
  } catch (err) {
    yield put(editUserProfileFailure(err.message));
  }
}

function* editBookAsync({ payload }) {
  const { newImageSources, ...otherInfo } = payload;

  try {
    yield call(setAuthToken);

    // save book data first
    const response = yield call(axios, {
      method: 'post',
      url: 'api/books',
      data: { ...otherInfo }
    });

    const bookId = response.data.book._id;

    // save all new image sources
    for (const newSource of newImageSources) {
      const fd = yield new FormData();
      const file = yield dataURLtoFile(newSource, 'bookImage.png');
      fd.append('image', file, file.name);
      yield call(axios.post, `api/bookimages/setimage/${bookId}`, fd);
    }

    yield put(editBookSuccess());
    // ! CALL SAGA TO GET ALL BOOKS
  } catch (err) {
    yield put(editBookFailure(err.message));
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

function* editUserProfileStart() {
  yield takeLatest(
    UserActionTypes.EDIT_USER_PROFILE_START,
    editUserProfileAsync
  );
}

function* editBookStart() {
  yield takeLatest(UserActionTypes.EDIT_BOOK_START, editBookAsync);
}

export default function* userSagas() {
  yield all([
    call(loadingUserStart),
    call(signInUserStart),
    call(signupUserStart),
    call(signoutUserStart),
    call(editUserProfileStart),
    call(editBookStart)
  ]);
}
