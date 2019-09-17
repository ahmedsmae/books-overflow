import SelectedUserActionTypes from './selected-user.types';

export const getSelectedUserStart = id => ({
  type: SelectedUserActionTypes.GET_SELECTED_USER_START,
  payload: id
});

export const getSelectedUserSuccess = selectedUser => ({
  type: SelectedUserActionTypes.GET_SELECTED_USER_SUCCESS,
  payload: selectedUser
});

export const getSelectedUserFailure = errorMessage => ({
  type: SelectedUserActionTypes.GET_SELECTED_USER_FAILURE,
  payload: errorMessage
});
