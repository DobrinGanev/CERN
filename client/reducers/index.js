import { combineReducers } from 'redux';
import message from './message';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  message,
  routing: routerReducer
});

export default rootReducer;
