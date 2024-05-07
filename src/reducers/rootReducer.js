// reducers/rootReducer.js
import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './authReducer';
import DataReducer from './dataReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  data: DataReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
