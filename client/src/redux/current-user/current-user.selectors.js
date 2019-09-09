import { createSelector } from 'reselect';

const selectCurrentUser = state => state.currentUser;

export const selectUser = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.user
);

export const selectBooks = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.books
);

export const selectColelctions = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.collections
);

export const selectNotifications = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.notifications
);

export const selectChats = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.chats
);

export const selectFavourites = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.favourites
);

export const selectBlockedUsers = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.blockedUsers
);
