import { createSelector } from 'reselect';

const selectCurrentUser = state => state.currentUser;

export const selectUser = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.user
);

export const selectUserFavourtiteIds = createSelector(
  [selectUser],
  user => user && user.favourites.map(fav => fav.favouriteitemid)
);

export const selectBooks = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.books
);

export const selectCollections = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.collections
);

export const selectNotifications = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.notifications
);

export const selectUnseenNotificationsCount = createSelector(
  [selectNotifications],
  notifications =>
    notifications &&
    notifications.reduce(
      (accumalatedQuantity, note) =>
        !note.seen ? accumalatedQuantity + 1 : accumalatedQuantity,
      0
    )
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

export const selectSelectedItem = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.selectedItem
);
