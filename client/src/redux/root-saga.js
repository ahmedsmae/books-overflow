import { all, call } from 'redux-saga/effects';

// import all sagas
import userSagas from './current-user/current-user.sagas';
import conversionRatesSagas from './conversion-rates/conversion-rates.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(userSagas),
    call(conversionRatesSagas)
  ]);
}
