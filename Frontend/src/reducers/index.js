import { combineReducers } from 'redux';
import helperReducer from './helperReducer';

export default combineReducers({
  helper: helperReducer
  // Add other reducers here as needed
}); 