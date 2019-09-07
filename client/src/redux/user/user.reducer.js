import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  errorMessage: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.REGISTER_USER_START:
    case UserActionTypes.SIGNIN_USER_START:
    case UserActionTypes.LOADING_USER_START:
    case UserActionTypes.SIGNOUT_USER_START:
      return {
        ...state,
        currentUser: null,
        loading: true,
        errorMessage: null
      };

    case UserActionTypes.REGISTER_USER_SUCCESS:
    case UserActionTypes.SIGNIN_USER_SUCCESS:
    case UserActionTypes.LOADING_USER_SUCCESS:
    case UserActionTypes.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        loading: false,
        errorMessage: null
      };

    case UserActionTypes.REGISTER_USER_FAILURE:
    case UserActionTypes.SIGNIN_USER_FAILURE:
    case UserActionTypes.LOADING_USER_FAILURE:
    case UserActionTypes.SIGNOUT_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};
