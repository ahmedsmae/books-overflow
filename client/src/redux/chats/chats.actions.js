import ChatsActionTypes from './chats.types';

// GET USER UNSEEN MESSAGES COUNT
export const getUserUnseenMsgsCountStart = () => ({
  type: ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_START
});

export const getUserUnseenMsgsCountSuccess = count => ({
  type: ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_SUCCESS,
  payload: count
});

export const getUserUnseenMsgsCountFailure = errorMessage => ({
  type: ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_FAILURE,
  payload: errorMessage
});

// GET USER BASIC CHATS
export const getUserBasicChatsStart = () => ({
  type: ChatsActionTypes.GET_USER_BASIC_CHATS_START
});

export const getUserBasicChatsSuccess = chats => ({
  type: ChatsActionTypes.GET_USER_BASIC_CHATS_SUCCESS,
  payload: chats
});

export const getUserBasicChatsFailure = errorMessage => ({
  type: ChatsActionTypes.GET_USER_BASIC_CHATS_FAILURE,
  payload: errorMessage
});

// GET USER CHAT
export const getChatStart = opponentid => ({
  type: ChatsActionTypes.GET_CHAT_START,
  payload: opponentid
});

export const getChatSuccess = chat => ({
  type: ChatsActionTypes.GET_CHAT_SUCCESS,
  payload: chat
});

export const getChatFailure = errorMessage => ({
  type: ChatsActionTypes.GET_CHAT_FAILURE,
  payload: errorMessage
});

export const pushMsgToCurrentChat = msg => ({
  type: ChatsActionTypes.PUSH_MSG_TO_CURRENT_CHAT,
  payload: msg
});
