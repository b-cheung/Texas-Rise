import { combineReducers } from 'redux';

import { reducer as auth } from '../modules/auth';
import { reducer as main } from '../modules/main';

import * as types from '../modules/auth/actionTypes';

// Combine all the reducers
const appReducer = combineReducers({ auth, main });

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
