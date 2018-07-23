import { combineReducers } from 'redux';

import { reducer as authReducer } from '../modules/auth';
import { reducer as homeReducer } from '../modules/home';

// Combine all the reducers
const appReducer = combineReducers({ authReducer, homeReducer });

const rootReducer = (state, action) => {
  console.log('rootReducer');
  if (action.type === 'logout') {
    console.log('action.type: logout');
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
