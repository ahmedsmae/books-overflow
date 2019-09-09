import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import all reducers
import userReducer from './current-user/current-user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // add reducers that uoi want to persist
  whitelist: ['user']
};

const rootReducer = combineReducers({
  // add all reducers
  currentUser: userReducer
});

export default persistReducer(persistConfig, rootReducer);
