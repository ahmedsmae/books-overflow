import SelectedUserActionTypes from './selected-user.types';

const INITIAL_STATE = {
  selectedUser: null,
  items: null,
  loading: false,
  errorMessage: ''
};

const selectedUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SelectedUserActionTypes.GET_SELECTED_USER_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case SelectedUserActionTypes.GET_SELECTED_USER_SUCCESS:
      return {
        ...state,
        selectedUser: payload,
        loading: false,
        errorMessage: ''
      };

    case SelectedUserActionTypes.GET_SELECTED_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default selectedUserReducer;
