import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';

import setAuthToken from '../utils/setAuthToken';
import ChatsActionTypes from './chats.types';
import {
  getUserUnseenMsgsCountSuccess,
  getUserUnseenMsgsCountFailure,
  getUserBasicChatsSuccess,
  getUserBasicChatsFailure,
  getChatSuccess,
  getChatFailure
} from './chats.actions';

function* getUnseenMsgsCountAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/chats/unseenmessages'
    });

    yield put(getUserUnseenMsgsCountSuccess(response.data.count));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getUserUnseenMsgsCountFailure(err.message));
  }
}

function* getUserBasicChatsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: '/api/chats/basicchats'
    });

    yield put(getUserBasicChatsSuccess(response.data.chats));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getUserBasicChatsFailure(err.message));
  }
}

function* getChatAsync({ payload }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: `/api/chats/getchat/${payload}`
    });

    yield put(getChatSuccess(response.data.chat));
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(getChatFailure(err.message));
  }
}

function* getUnseenMsgsCountStart() {
  yield takeLatest(
    ChatsActionTypes.GET_USER_UNSEEN_MSGS_COUNT_START,
    getUnseenMsgsCountAsync
  );
}

function* getUserBasicChatsStart() {
  yield takeLatest(
    ChatsActionTypes.GET_USER_BASIC_CHATS_START,
    getUserBasicChatsAsync
  );
}

function* getChatStart() {
  yield takeLatest(ChatsActionTypes.GET_CHAT_START, getChatAsync);
}

export default function* chatsSagas() {
  yield all([
    call(getUnseenMsgsCountStart),
    call(getUserBasicChatsStart),
    call(getChatStart)
  ]);
}
