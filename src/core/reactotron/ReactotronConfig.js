import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import host from './host';

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect(); // let's connect!

console.tron = Reactotron;
Reactotron.clear();
