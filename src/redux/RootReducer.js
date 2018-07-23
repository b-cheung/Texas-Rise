import { combineReducers } from 'redux';

import { reducer as authReducer } from '../modules/auth';
import { reducer as homeReducer } from '../modules/home';

import * as types from '../modules/auth/actionTypes';

// Combine all the reducers
const appReducer = combineReducers({ authReducer, homeReducer });

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    console.log('rootReducer logout');
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
