import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import all reducers
import userReducer from './current-user/current-user.reducer';
import constantsReducer from './constants/constants.reducer';
import convertionRatesReducer from './conversion-rates/conversion-rates.reducer';
import publicItemsReducer from './public-items/public-items.reducer';
import selectedUserReducer from './selected-user/selected-user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // add reducers that uoi want to persist
  whitelist: ['currentUser', 'conversionRates', 'public', 'selectedUser']
};

const rootReducer = combineReducers({
  // add all reducers
  currentUser: userReducer,
  constants: constantsReducer,
  conversionRates: convertionRatesReducer,
  public: publicItemsReducer,
  selectedUser: selectedUserReducer
});

export default persistReducer(persistConfig, rootReducer);
