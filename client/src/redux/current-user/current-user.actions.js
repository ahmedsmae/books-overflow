import UserActionTypes from './current-user.types';

// LOADING USER
export const loadingUserStart = () => ({
  type: UserActionTypes.LOADING_USER_START
});

export const loadingUserSuccess = user => ({
  type: UserActionTypes.LOADING_USER_SUCCESS,
  payload: user
});

export const loadingUserFailure = errorMessage => ({
  type: UserActionTypes.LOADING_USER_FAILURE,
  payload: errorMessage
});

// SIGNUP USER
export const signupUserStart = userCredentials => ({
  type: UserActionTypes.SIGNUP_USER_START,
  payload: userCredentials
});

export const signupUserSuccess = user => ({
  type: UserActionTypes.SIGNUP_USER_SUCCESS,
  payload: user
});

export const signupUserFailure = errorMessage => ({
  type: UserActionTypes.SIGNUP_USER_FAILURE,
  payload: errorMessage
});

// SIGNIN USER
export const signinUserStart = userCredentials => ({
  type: UserActionTypes.SIGNIN_USER_START,
  payload: userCredentials
});

export const signinUserSuccess = user => ({
  type: UserActionTypes.SIGNIN_USER_SUCCESS,
  payload: user
});

export const signinUserFailure = errorMessage => ({
  type: UserActionTypes.SIGNIN_USER_FAILURE,
  payload: errorMessage
});

// SIGNOUT USER
export const signoutUserStart = () => ({
  type: UserActionTypes.SIGNOUT_USER_START
});

export const signoutUserSuccess = () => ({
  type: UserActionTypes.SIGNOUT_USER_SUCCESS
});

export const signoutUserFailure = errorMessage => ({
  type: UserActionTypes.SIGNOUT_USER_FAILURE,
  payload: errorMessage
});

// EDIT PROFILE
export const editUserProfileStart = userInfo => ({
  type: UserActionTypes.EDIT_USER_PROFILE_START,
  payload: userInfo
});

export const editUserProfileSuccess = user => ({
  type: UserActionTypes.EDIT_USER_PROFILE_SUCCESS,
  payload: user
});

export const editUserProfileFailure = errorMessage => ({
  type: UserActionTypes.EDIT_USER_PROFILE_FAILURE,
  payload: errorMessage
});

// EDIT BOOK
export const editBookStart = bookInfo => ({
  type: UserActionTypes.EDIT_BOOK_START,
  payload: bookInfo
});

export const editBookSuccess = () => ({
  type: UserActionTypes.EDIT_BOOK_SUCCESS
});

export const editBookFailure = errorMessage => ({
  type: UserActionTypes.EDIT_BOOK_FAILURE,
  payload: errorMessage
});

// GET BOOKS
export const getUserBooksStart = () => ({
  type: UserActionTypes.GET_USER_BOOKS_START
});

export const getUserBooksSuccess = books => ({
  type: UserActionTypes.GET_USER_BOOKS_SUCCESS,
  payload: books
});

export const getUserBooksFailure = errorMessage => ({
  type: UserActionTypes.GET_USER_BOOKS_FAILURE,
  payload: errorMessage
});

// EDIT COLLECTION
export const editCollectionStart = collectionInfo => ({
  type: UserActionTypes.EDIT_COLLECTION_START,
  payload: collectionInfo
});

export const editCollectionSuccess = () => ({
  type: UserActionTypes.EDIT_COLLECTION_SUCCESS
});

export const editCollectionFailure = errorMessage => ({
  type: UserActionTypes.EDIT_COLLECTION_FAILURE,
  payload: errorMessage
});

// GET COLLECTIONS
export const getUserCollectionsStart = () => ({
  type: UserActionTypes.GET_USER_COLLECTIONS_START
});

export const getUserCollectionsSuccess = collections => ({
  type: UserActionTypes.GET_USER_COLLECTIONS_SUCCESS,
  payload: collections
});

export const getUserCollectionsFailure = errorMessage => ({
  type: UserActionTypes.GET_USER_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// GET NOTIFICATIONS
export const getUserNotificationsStart = () => ({
  type: UserActionTypes.GET_USER_NOTIFICATIONS_START
});

export const getUserNotificationsSuccess = notifications => ({
  type: UserActionTypes.GET_USER_NOTIFICATIONS_SUCCESS,
  payload: notifications
});

export const getUserNotificationsFailure = errorMessage => ({
  type: UserActionTypes.GET_USER_NOTIFICATIONS_FAILURE,
  payload: errorMessage
});

// UPDATE NOTIFICATION
export const updateNotificationStart = noteficationId => ({
  type: UserActionTypes.UPDATE_NOTIFICATION_START,
  payload: noteficationId
});

export const updateNotificationSuccess = () => ({
  type: UserActionTypes.UPDATE_NOTIFICATION_SUCCESS
});

export const updateNotificationFailure = errorMessage => ({
  type: UserActionTypes.UPDATE_NOTIFICATION_FAILURE,
  payload: errorMessage
});

// DELETE BOOK
export const deleteBookStart = bookId => ({
  type: UserActionTypes.DELETE_BOOK_START,
  payload: bookId
});

export const deleteBookSuccess = () => ({
  type: UserActionTypes.DELETE_BOOK_SUCCESS
});

export const deleteBookFailure = errorMessage => ({
  type: UserActionTypes.DELETE_BOOK_FAILURE,
  payload: errorMessage
});

// DELETE COLLECTION
export const deleteCollectionStart = collectionId => ({
  type: UserActionTypes.DELETE_COLLECTION_START,
  payload: collectionId
});

export const deleteCollectionSuccess = () => ({
  type: UserActionTypes.DELETE_COLLECTION_SUCCESS
});

export const deleteCollectionFailure = errorMessage => ({
  type: UserActionTypes.DELETE_COLLECTION_FAILURE,
  payload: errorMessage
});

// FORGET PASSWORD
export const forgetPasswordStart = email => ({
  type: UserActionTypes.FORGET_PASSWORD_START,
  payload: email
});

export const forgetPasswordSuccess = () => ({
  type: UserActionTypes.FORGET_PASSWORD_SUCCESS
});

export const forgetPasswordFailure = errorMessage => ({
  type: UserActionTypes.FORGET_PASSWORD_FAILURE,
  payload: errorMessage
});

// CHANGE PASSWORD
export const changePasswordStart = (oldPassword, newPassword) => ({
  type: UserActionTypes.CHANGE_PASSWORD_START,
  payload: { oldPassword, newPassword }
});

export const changePasswordSuccess = () => ({
  type: UserActionTypes.CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFailure = errorMessage => ({
  type: UserActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: errorMessage
});

// SELECTED ITEM
export const setSelectedItem = selectedItem => ({
  type: UserActionTypes.SET_SELECTED_ITEM,
  payload: selectedItem
});

export const clearSelectedItem = () => ({
  type: UserActionTypes.CLEAR_SELECTED_ITEM
});

//
