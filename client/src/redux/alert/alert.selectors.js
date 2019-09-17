import { createSelector } from 'reselect';

const selectAlert = state => state.alert;

export const selectAlertHeader = createSelector(
  [selectAlert],
  alert => alert.header
);

export const selectAlertMessage = createSelector(
  [selectAlert],
  alert => alert.message
);

export const selectAlertDisplay = createSelector(
  [selectAlert],
  alert => alert.display
);

export const selectAlertTimeout = createSelector(
  [selectAlert],
  alert => alert.timeout
);

export const selectAlertType = createSelector(
  [selectAlert],
  alert => alert.alertType
);
