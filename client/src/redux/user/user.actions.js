import UserActionTypes from './user.types';

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

export const registerUserStart = userCredentials => ({
  type: UserActionTypes.REGISTER_USER_START,
  payload: userCredentials
});

export const registerUserSuccess = user => ({
  type: UserActionTypes.REGISTER_USER_SUCCESS,
  payload: user
});

export const registerUserFailure = errorMessage => ({
  type: UserActionTypes.REGISTER_USER_FAILURE,
  payload: errorMessage
});

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
