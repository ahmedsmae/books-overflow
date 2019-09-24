import { call, takeLatest, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

import setAuthToken from '../utils/setAuthToken';
import { dataURLtoFile } from './current-user.utils';
import getLatLng from '../utils/get-lat-lng';

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
  updateNotificationFailure,
  deleteBookSuccess,
  deleteBookFailure,
  deleteCollectionSuccess,
  deleteCollectionFailure,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  changePasswordSuccess,
  changePasswordFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addFavouriteSuccess,
  addFavouriteFailure,
  removeFavouriteSuccess,
  removeFavouriteFailure,
  getUserFavouriteSuccess,
  getUserFavouriteFailure,
  addBlockedUserSuccess,
  addBlockedUserFailure,
  removeBlockedUserSuccess,
  removeBlockedUserFailure,
  getBlockedUsersSuccess,
  getBlockedUsersFailure
} from './current-user.actions';

function* signupUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: '/api/users/signup',
      data: { ...payload }
    });

    yield localStorage.setItem('token', response.data.token);

    yield put(signupUserSuccess(response.data.user));
    yield put(setAlert(null, 'Successful signup', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(signupUserFailure(err.message));
  }
}

function* signInUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: '/api/users/signin',
      data: { ...payload }
    });

    yield localStorage.setItem('token', response.data.token);

    yield put(signinUserSuccess(response.data.user));
    yield put(setAlert(null, 'Successful signin', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(signinUserFailure(err.message));
  }
}

function* loadingUserAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/users/auth'
    });

    yield put(loadingUserSuccess(response.data.user));
  } catch (err) {
    console.log(err.response.data);

    yield put(
      setAlert(
        'You are not authenticated!',
        err.response.data.error,
        'warning',
        5000
      )
    );
    yield put(loadingUserFailure(err.message));
  }
}

function* signoutUserAsync() {
  try {
    yield call(setAuthToken);

    yield call(axios, {
      method: 'post',
      url: '/api/users/signout'
    });

    yield localStorage.removeItem('token');

    yield put(signoutUserSuccess());
    yield put(setAlert(null, 'Successful signout', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
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
      url: '/api/users/profile',
      data: { ...otherInfo }
    });

    yield put(editUserProfileSuccess(response.data.user));
    yield put(setAlert(null, 'profile edited successfully', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
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
      url: '/api/books',
      data: { ...otherInfo }
    });

    const bookId = response.data.book._id;

    // save all new image sources
    let newSource;
    for (newSource of newImageSources) {
      const fd = yield new FormData();
      const file = yield dataURLtoFile(newSource, 'bookImage.png');
      fd.append('image', file, file.name);
      yield call(axios.post, `api/bookimages/setimage/${bookId}`, fd);
    }

    yield put(editBookSuccess());
    yield put(setAlert(null, 'Changes done successfully', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(editBookFailure(err.message));
  }
}

function* getBooksAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/books/mybooks'
    });

    yield put(getUserBooksSuccess(response.data.books));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
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
      url: '/api/collections',
      data: { ...otherInfo }
    });

    const collectionId = response.data.collection._id;

    // save all new image sources
    let newSource;
    for (newSource of newImageSources) {
      const fd = yield new FormData();
      const file = yield dataURLtoFile(newSource, 'collectionImage.png');
      fd.append('image', file, file.name);
      yield call(
        axios.post,
        `/api/collectionimages/setimage/${collectionId}`,
        fd
      );
    }

    yield put(editCollectionSuccess());
    yield put(setAlert(null, 'Changes done successfully', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(editCollectionFailure(err.message));
  }
}

function* getCollectionsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/collections/mycollections'
    });

    yield put(getUserCollectionsSuccess(response.data.collections));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getUserCollectionsFailure(err.message));
  }
}

function* getNotificationsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/notifications/mynotifications'
    });

    yield put(getUserNotificationsSuccess(response.data.notifications));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getUserNotificationsFailure(err.message));
  }
}

function* updateNotificationAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'post',
      url: `/api/users/profile/updatenotificationseen/${payload}`
    });

    yield put(updateNotificationSuccess());
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(updateNotificationFailure(err.message));
  }
}

function* deleteBookAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'delete',
      url: `/api/books/${payload}`
    });

    yield put(deleteBookSuccess());
    yield put(setAlert(null, 'Book deleted successfully', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(deleteBookFailure(err.message));
  }
}

function* deleteCollectionAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'delete',
      url: `/api/collections/${payload}`
    });

    yield put(deleteCollectionSuccess());
    yield put(
      setAlert(null, 'Collection deleted successfully', 'success', 2000)
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(deleteCollectionFailure(err.message));
  }
}

function* forgetPasswordAsync({ payload }) {
  try {
    yield call(axios, {
      method: 'post',
      url: '/api/users/forgetpassword',
      data: { email: payload }
    });

    yield put(forgetPasswordSuccess());
    yield put(
      setAlert(null, 'New password sent to your email', 'success', 2000)
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(forgetPasswordFailure(err.message));
  }
}

function* changePasswordAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: '/api/users/changepassword',
      data: { ...payload }
    });

    yield localStorage.setItem('token', response.data.token);

    yield put(changePasswordSuccess(response.data.user));
    yield put(setAlert(null, 'Password cahnged successfully', 'success', 2000));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(changePasswordFailure(err.message));
  }
}

function* deleteUserAsync({ payload }) {
  try {
    yield setAuthToken();

    yield call(axios, {
      method: 'delete',
      url: '/api/users/deleteuser',
      data: { ...payload }
    });

    yield localStorage.removeItem('token');

    yield put(setAlert(null, 'User deleted successfully', 'success', 2000));
    yield put(deleteUserSuccess());
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(deleteUserFailure(err.message));
  }
}

function* addFavouriteAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: '/api/users/profile/favourites',
      data: { ...payload }
    });

    yield put(addFavouriteSuccess(response.data.user));
    yield put(
      setAlert(
        null,
        'Item successfully added to your favourites',
        'success',
        2000
      )
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(addFavouriteFailure(err.message));
  }
}

function* removeFavouriteAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `/api/users/profile/favourites/${payload}`
    });

    yield put(removeFavouriteSuccess(response.data.user));
    yield put(
      setAlert(
        null,
        'Item successfully removed from your favourites',
        'success',
        2000
      )
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(removeFavouriteFailure(err.message));
  }
}

function* getUserFavouritesAsync() {
  try {
    yield setAuthToken();

    // get user lat lng
    const { latitude, longitude } = yield call(getLatLng);
    console.log(latitude, longitude);

    if (latitude && longitude) {
      const response = yield call(axios, {
        method: 'post',
        url: '/api/users/profile/getfavourites',
        data: { latitude, longitude }
      });
      yield put(getUserFavouriteSuccess(response.data.favourites));
    }
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getUserFavouriteFailure(err.message));
  }
}

function* addBlockedUserAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'post',
      url: '/api/users/profile/blockedusers',
      data: { ...payload }
    });

    yield put(addBlockedUserSuccess(response.data.user));
    yield put(
      setAlert(
        null,
        'User successfully added to your blocked list',
        'success',
        2000
      )
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(addBlockedUserFailure(err.message));
  }
}

function* removeBlockedUserAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'delete',
      url: `/api/users/profile/blockedusers/${payload}`
    });

    yield put(removeBlockedUserSuccess(response.data.user));
    yield put(
      setAlert(
        null,
        'User successfully removed from your blocked list',
        'success',
        2000
      )
    );
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(removeBlockedUserFailure(err.message));
  }
}

function* getBlockedUsersAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/users/profile/blockedusers'
    });

    yield put(getBlockedUsersSuccess(response.data.blockedUsers));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getBlockedUsersFailure(err.message));
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

function* deleteCollectionStart() {
  yield takeLatest(
    UserActionTypes.DELETE_COLLECTION_START,
    deleteCollectionAsync
  );
}

// this saga will listen to the success in the delete a collection then will run get collections again
function* reloadCollectionsAfterDeleteCollection() {
  yield takeLatest(
    UserActionTypes.DELETE_COLLECTION_SUCCESS,
    getCollectionsAsync
  );
}

function* deleteBookStart() {
  yield takeLatest(UserActionTypes.DELETE_BOOK_START, deleteBookAsync);
}

// this saga will listen to the success in the delete a book then will run get collections again
function* reloadBooksAfterDeleteBook() {
  yield takeLatest(UserActionTypes.DELETE_BOOK_SUCCESS, getBooksAsync);
}

function* changePasswordStart() {
  yield takeLatest(UserActionTypes.CHANGE_PASSWORD_START, changePasswordAsync);
}

function* forgetPasswordStart() {
  yield takeLatest(UserActionTypes.FORGET_PASSWORD_START, forgetPasswordAsync);
}

function* deleteUserStart() {
  yield takeLatest(UserActionTypes.DELETE_USER_START, deleteUserAsync);
}

function* addFavouriteStart() {
  yield takeLatest(UserActionTypes.ADD_FAVOURITE_START, addFavouriteAsync);
}

function* removeFavouriteStart() {
  yield takeLatest(
    UserActionTypes.REMOVE_FAVOURITE_START,
    removeFavouriteAsync
  );
}

function* getUserFavouritesStart() {
  yield takeLatest(
    UserActionTypes.GET_USER_FAVOURITES_START,
    getUserFavouritesAsync
  );
}

function* addBlockedUserStart() {
  yield takeLatest(UserActionTypes.ADD_BLOCKED_USER_START, addBlockedUserAsync);
}

function* removeBlockedUserStart() {
  yield takeLatest(
    UserActionTypes.REMOVE_BLOCKED_USER_START,
    removeBlockedUserAsync
  );
}

// function* reloadBlockedUsersAfterRemoveBlockedUser() {
//   yield takeLatest(
//     UserActionTypes.REMOVE_BLOCKED_USER_SUCCESS,
//     getBlockedUsersAsync
//   );
// }

function* getBlockedUsersStart() {
  yield takeLatest(
    UserActionTypes.GET_BLOCKED_USERS_START,
    getBlockedUsersAsync
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
    call(reloadNotificationsAfterUpdateOne),
    call(deleteCollectionStart),
    call(reloadCollectionsAfterDeleteCollection),
    call(deleteBookStart),
    call(reloadBooksAfterDeleteBook),
    call(changePasswordStart),
    call(forgetPasswordStart),
    call(deleteUserStart),
    call(addFavouriteStart),
    call(removeFavouriteStart),
    call(getUserFavouritesStart),
    call(addBlockedUserStart),
    call(removeBlockedUserStart),
    call(getBlockedUsersStart)
  ]);
}
