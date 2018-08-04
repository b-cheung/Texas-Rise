import Reactotron from 'reactotron-react-native';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './rootReducer'; //Import the root reducer

export const store = Reactotron.createStore(reducers, {}, applyMiddleware(thunkMiddleware));
