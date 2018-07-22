import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './RootReducer'; //Import the root reducer

export const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));
