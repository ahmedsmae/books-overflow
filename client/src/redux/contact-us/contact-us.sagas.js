import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import { setAlert } from '../alert/alert.actions';
import ContactUsActionTypes from './contact-us.types';
import { contactUsSuccess, contactUsFailure } from './contact-us.actions';

function* contactAsync({ payload }) {
  try {
    yield call(axios, {
      method: 'post',
      url: '/api/contact/contactus',
      data: { ...payload }
    });

    yield put(contactUsSuccess());
  } catch (err) {
    yield put(setAlert('Error!', err.message, 'danger', 5000));
    yield put(contactUsFailure(err.message));
  }
}

function* contactStart() {
  yield takeLatest(ContactUsActionTypes.CONTACT_US_START, contactAsync);
}

export default function* contactUsSagas() {
  yield all([call(contactStart)]);
}
