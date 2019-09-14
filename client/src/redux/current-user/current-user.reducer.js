import UserActionTypes from './current-user.types';

const INITIAL_STATE = {
  user: null,
  books: null,
  collections: [],
  notifications: [],
  chats: [],
  favourites: [],
  blockedUsers: [],
  selectedItem: null,
  loading: false,
  errorMessage: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SIGNUP_USER_START:
    case UserActionTypes.SIGNIN_USER_START:
    case UserActionTypes.LOADING_USER_START:
    case UserActionTypes.SIGNOUT_USER_START:
    case UserActionTypes.EDIT_USER_PROFILE_START:
    case UserActionTypes.EDIT_BOOK_START:
    case UserActionTypes.GET_USER_BOOKS_START:
    case UserActionTypes.EDIT_COLLECTION_START:
    case UserActionTypes.GET_USER_COLLECTIONS_START:
    case UserActionTypes.GET_USER_NOTIFICATIONS_START:
    case UserActionTypes.UPDATE_NOTIFICATION_START:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };

    case UserActionTypes.SIGNUP_USER_SUCCESS:
    case UserActionTypes.SIGNIN_USER_SUCCESS:
    case UserActionTypes.LOADING_USER_SUCCESS:
    case UserActionTypes.SIGNOUT_USER_SUCCESS:
    case UserActionTypes.EDIT_USER_PROFILE_SUCCESS:
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
    case UserActionTypes.EDIT_USER_PROFILE_FAILURE:
    case UserActionTypes.EDIT_BOOK_FAILURE:
    case UserActionTypes.GET_USER_BOOKS_FAILURE:
    case UserActionTypes.EDIT_COLLECTION_FAILURE:
    case UserActionTypes.GET_USER_COLLECTIONS_FAILURE:
    case UserActionTypes.GET_USER_NOTIFICATIONS_FAILURE:
    case UserActionTypes.UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    case UserActionTypes.GET_USER_BOOKS_SUCCESS:
      return {
        ...state,
        books: payload,
        loading: false,
        errorMessage: ''
      };

    case UserActionTypes.GET_USER_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: payload,
        loading: false,
        errorMessage: ''
      };

    case UserActionTypes.GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload,
        loading: false,
        errorMessage: ''
      };

    case UserActionTypes.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: payload
      };

    case UserActionTypes.CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: null
      };

    case UserActionTypes.EDIT_BOOK_SUCCESS:
    case UserActionTypes.EDIT_COLLECTION_SUCCESS:
    case UserActionTypes.UPDATE_NOTIFICATION_SUCCESS:
    default:
      return state;
  }
};
