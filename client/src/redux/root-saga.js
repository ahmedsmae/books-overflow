import { all, call } from 'redux-saga/effects';

// import all sagas
import userSagas from './current-user/current-user.sagas';
import conversionRatesSagas from './conversion-rates/conversion-rates.sagas';
import publicItemsSagas from './public-items/public-items.sagas';
import selectedUserSagas from './selected-user/selected-user.sagas';
import contactUsSagas from './contact-us/contact-us.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(userSagas),
    call(conversionRatesSagas),
    call(publicItemsSagas),
    call(selectedUserSagas),
    call(contactUsSagas)
  ]);
}
