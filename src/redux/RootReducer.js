import { combineReducers } from 'redux';

import { reducer as authReducer } from '../modules/auth';
import { reducer as mainReducer } from '../modules/main';

import * as types from '../modules/auth/actionTypes';

// Combine all the reducers
const appReducer = combineReducers({ authReducer, mainReducer });

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
