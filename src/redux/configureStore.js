import Reactotron from 'reactotron-react-native';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; //Import the root reducer
import rootSaga from './rootSaga'; //Import the root saga

console.log('configureStore.js');
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
export default function configureStore(initialState) {
  const store = Reactotron.createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, sagaMiddleware)
  );
	sagaMiddleware.run(rootSaga);
	console.tron.log('configured store');
  return store;
}
