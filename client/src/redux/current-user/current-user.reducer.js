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
    case UserActionTypes.DELETE_BOOK_START:
    case UserActionTypes.DELETE_COLLECTION_START:
    case UserActionTypes.FORGET_PASSWORD_START:
    case UserActionTypes.CHANGE_PASSWORD_START:
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
    case UserActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        errorMessage: null
      };

    case UserActionTypes.SIGNUP_USER_FAILURE:
    case UserActionTypes.SIGNIN_USER_FAILURE:
    case UserActionTypes.LOADING_USER_FAILURE:
    case UserActionTypes.FORGET_PASSWORD_SUCCESS: // REMOVE USER WHEN U CHANGE THE PASSWORD
      return {
        ...state,
        user: null,
        loading: false,
        errorMessage: payload
      };

    case UserActionTypes.SIGNOUT_USER_FAILURE:
    case UserActionTypes.EDIT_USER_PROFILE_FAILURE:
    case UserActionTypes.EDIT_BOOK_FAILURE:
    case UserActionTypes.GET_USER_BOOKS_FAILURE:
    case UserActionTypes.EDIT_COLLECTION_FAILURE:
    case UserActionTypes.GET_USER_COLLECTIONS_FAILURE:
    case UserActionTypes.GET_USER_NOTIFICATIONS_FAILURE:
    case UserActionTypes.UPDATE_NOTIFICATION_FAILURE:
    case UserActionTypes.DELETE_BOOK_FAILURE:
    case UserActionTypes.DELETE_COLLECTION_FAILURE:
    case UserActionTypes.FORGET_PASSWORD_FAILURE:
    case UserActionTypes.CHANGE_PASSWORD_FAILURE:
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

    // THESES ROUTES WILL NOT REACH THE REDUCER BECAUSE OF THE CATCHING SAGAS
    // case UserActionTypes.EDIT_BOOK_SUCCESS:
    // case UserActionTypes.EDIT_COLLECTION_SUCCESS:
    // case UserActionTypes.DELETE_BOOK_SUCCESS:
    // case UserActionTypes.DELETE_COLLECTION_SUCCESS:
    // case UserActionTypes.UPDATE_NOTIFICATION_SUCCESS:
    //   break;

    default:
      return state;
  }
};
