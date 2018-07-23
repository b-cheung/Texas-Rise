import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './rootReducer'; //Import the root reducer

export const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));
