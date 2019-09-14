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
  editBookFailure,
  getUserBooksSuccess,
  getUserBooksFailure,
  editCollectionSuccess,
  editCollectionFailure,
  getUserCollectionsSuccess,
  getUserCollectionsFailure,
  getUserNotificationsSuccess,
  getUserNotificationsFailure,
  updateNotificationSuccess,
  updateNotificationFailure
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

    if (source) {
      const fd = yield new FormData();
      const file = yield dataURLtoFile(source, 'userImage.png');
      fd.append('avatar', file, file.name);
      yield call(axios.post, 'api/avatars/setavatar', fd);
    }

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
  } catch (err) {
    yield put(editBookFailure(err.message));
  }
}

function* getBooksAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: 'api/books/mybooks'
    });

    yield put(getUserBooksSuccess(response.data.books));
  } catch (err) {
    yield put(getUserBooksFailure(err.message));
  }
}

function* editCollectionAsync({ payload }) {
  const { newImageSources, ...otherInfo } = payload;

  try {
    yield call(setAuthToken);

    // save collection data first
    const response = yield call(axios, {
      method: 'post',
      url: 'api/collections',
      data: { ...otherInfo }
    });

    const collectionId = response.data.collection._id;

    // save all new image sources
    for (const newSource of newImageSources) {
      const fd = yield new FormData();
      const file = yield dataURLtoFile(newSource, 'collectionImage.png');
      fd.append('image', file, file.name);
      yield call(
        axios.post,
        `api/collectionimages/setimage/${collectionId}`,
        fd
      );
    }

    yield put(editCollectionSuccess());
  } catch (err) {
    yield put(editCollectionFailure(err.message));
  }
}

function* getCollectionsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: 'api/collections/mycollections'
    });

    yield put(getUserCollectionsSuccess(response.data.collections));
  } catch (err) {
    yield put(getUserCollectionsFailure(err.message));
  }
}

function* getNotificationsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: 'api/notifications/mynotifications'
    });

    yield put(getUserNotificationsSuccess(response.data.notifications));
  } catch (err) {
    yield put(getUserNotificationsFailure(err.message));
  }
}

function* updateNotificationAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'post',
      url: `api/users/profile/updatenotificationseen/${payload}`
    });

    yield put(updateNotificationSuccess());
  } catch (err) {
    yield put(updateNotificationFailure(err.message));
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

// this saga will listen to the success in the edit book then will run get books again
function* reloadBooksAfterEditBook() {
  yield takeLatest(UserActionTypes.EDIT_BOOK_SUCCESS, getBooksAsync);
}

function* getBooksStart() {
  yield takeLatest(UserActionTypes.GET_USER_BOOKS_START, getBooksAsync);
}

function* editCollectionStart() {
  yield takeLatest(UserActionTypes.EDIT_COLLECTION_START, editCollectionAsync);
}

// this saga will listen to the success in the edit collection then will run get collections again
function* reloadCollectionsAfterEditCollection() {
  yield takeLatest(
    UserActionTypes.EDIT_COLLECTION_SUCCESS,
    getCollectionsAsync
  );
}

function* getCollectionsStart() {
  yield takeLatest(
    UserActionTypes.GET_USER_COLLECTIONS_START,
    getCollectionsAsync
  );
}

function* getNotificationsStart() {
  yield takeLatest(
    UserActionTypes.GET_USER_NOTIFICATIONS_START,
    getNotificationsAsync
  );
}

function* updateNotificationStart() {
  yield takeLatest(
    UserActionTypes.UPDATE_NOTIFICATION_START,
    updateNotificationAsync
  );
}

// this saga will listen to the success in the notification update then will run get notifications again
function* reloadNotificationsAfterUpdateOne() {
  yield takeLatest(
    UserActionTypes.UPDATE_NOTIFICATION_SUCCESS,
    getNotificationsAsync
  );
}

export default function* userSagas() {
  yield all([
    call(loadingUserStart),
    call(signInUserStart),
    call(signupUserStart),
    call(signoutUserStart),
    call(editUserProfileStart),
    call(editBookStart),
    call(getBooksStart),
    call(reloadBooksAfterEditBook),
    call(editCollectionStart),
    call(getCollectionsStart),
    call(reloadCollectionsAfterEditCollection),
    call(getNotificationsStart),
    call(updateNotificationStart),
    call(reloadNotificationsAfterUpdateOne)
  ]);
}
