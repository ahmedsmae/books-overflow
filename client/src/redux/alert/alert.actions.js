import AlertActionTypes from './alert.types';

export const setAlert = (header, message, alertType, timeout = 3000) => ({
  type: AlertActionTypes.SET_ALERT,
  payload: { header, message, alertType, timeout }
});

export const removeAlert = () => ({
  type: AlertActionTypes.REMOVE_ALERT
});
