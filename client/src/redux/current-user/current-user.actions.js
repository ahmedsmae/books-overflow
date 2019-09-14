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

// SELECTED ITEM
export const setSelectedItem = selectedItem => ({
  type: UserActionTypes.SET_SELECTED_ITEM,
  payload: selectedItem
});

export const clearSelectedItem = () => ({
  type: UserActionTypes.CLEAR_SELECTED_ITEM
});

//
