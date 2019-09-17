import AlertActionTypes from './alert.types';

const INITIAL_STATE = {
  display: false,
  header: '',
  message: '',
  timeout: null,
  alertType: ''
};

const alertReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AlertActionTypes.SET_ALERT:
      return {
        ...state,
        display: true,
        header: payload.header,
        message: payload.message,
        timeout: payload.timeout,
        alertType: payload.alertType
      };

    case AlertActionTypes.REMOVE_ALERT:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};

export default alertReducer;
