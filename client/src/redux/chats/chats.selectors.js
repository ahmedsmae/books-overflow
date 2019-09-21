import { createSelector } from 'reselect';

const selectChats = state => state.chats;

export const selectUnseenMsgsCount = createSelector(
  [selectChats],
  chats => chats.unseenMsgsCount
);

export const selectBasicChats = createSelector(
  [selectChats],
  chats => chats.basicChats
);

export const selectCurrentChat = createSelector(
  [selectChats],
  chats => chats.currentChat
);
