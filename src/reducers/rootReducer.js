// reducers/rootReducer.js
import {applyMiddleware, combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import authReducer from './authReducer';
import DataReducer from './dataReducer';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  data: DataReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
