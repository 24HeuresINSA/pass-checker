import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import passReducer from './pass';

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  pass: passReducer,
  routing: routerReducer
});
