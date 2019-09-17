import { createSelector } from 'reselect';

const selectedUser = state => state.selectedUser;

export const selectSelectedUser = createSelector(
  [selectedUser],
  selectedUser => selectedUser.selectedUser
);
