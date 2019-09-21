import ChatsActionTypes from './chats.types';

const INITIAL_STATE = {
  unseenMsgsCount: 0,
  basicChats: [],
  currentChat: null,
  loading: false,
  errorMessage: ''
};

const chatsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_START:
    case ChatsActionTypes.GET_USER_BASIC_CHATS_START:
    case ChatsActionTypes.GET_CHAT_START:
    case ChatsActionTypes.REMOVE_CHAT_COPY_START:
    case ChatsActionTypes.UPDATE_CHAT_MSGS_SEEN_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_SUCCESS:
      return {
        ...state,
        unseenMsgsCount: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_USER_BASIC_CHATS_SUCCESS:
      return {
        ...state,
        basicChats: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_CHAT_SUCCESS:
      return {
        ...state,
        currentChat: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_FAILURE:
      return {
        ...state,
        unseenMsgsCount: 0,
        loading: false,
        errorMessage: payload
      };

    case ChatsActionTypes.GET_USER_BASIC_CHATS_FAILURE:
      return {
        ...state,
        basicChats: [],
        loading: false,
        errorMessage: payload
      };

    case ChatsActionTypes.GET_CHAT_FAILURE:
      return {
        ...state,
        currentChat: null,
        loading: false,
        errorMessage: payload
      };

    case ChatsActionTypes.REMOVE_CHAT_COPY_FAILURE:
    case ChatsActionTypes.UPDATE_CHAT_MSGS_SEEN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    // case ChatsActionTypes.REMOVE_CHAT_COPY_SUCCESS:
    // case ChatsActionTypes.UPDATE_CHAT_MSGS_SEEN_SUCCESS:

    default:
      return state;
  }
};

export default chatsReducer;
