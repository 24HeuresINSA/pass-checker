import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import passReducer from './pass';

export default combineReducers({
  auth: authReducer,
  pass: passReducer,
  routing: routerReducer
});
