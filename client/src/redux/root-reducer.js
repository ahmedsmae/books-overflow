import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import all reducers
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // add reducers that uoi want to persist
  whitelist: ['user']
};

const rootReducer = combineReducers({
  // add all reducers
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
