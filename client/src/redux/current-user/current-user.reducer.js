import UserActionTypes from './current-user.types';

const INITIAL_STATE = {
  user: null,
  books: [],
  collections: [],
  notifications: [],
  chats: [],
  favourites: [],
  blockedUsers: [],
  loading: false,
  errorMessage: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SIGNUP_USER_START:
    case UserActionTypes.SIGNIN_USER_START:
    case UserActionTypes.LOADING_USER_START:
    case UserActionTypes.SIGNOUT_USER_START:
      return {
        ...state,
        user: null,
        loading: true,
        errorMessage: null
      };

    case UserActionTypes.SIGNUP_USER_SUCCESS:
    case UserActionTypes.SIGNIN_USER_SUCCESS:
    case UserActionTypes.LOADING_USER_SUCCESS:
    case UserActionTypes.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        errorMessage: null
      };

    case UserActionTypes.SIGNUP_USER_FAILURE:
    case UserActionTypes.SIGNIN_USER_FAILURE:
    case UserActionTypes.LOADING_USER_FAILURE:
    case UserActionTypes.SIGNOUT_USER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};
