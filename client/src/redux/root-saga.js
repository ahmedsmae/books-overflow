import { all, call } from 'redux-saga/effects';

// import all sagas
import userSagas from './user/user.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(userSagas)
  ]);
}
