import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import host from './host';

Reactotron.configure({ host }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

console.tron = Reactotron;
Reactotron.clear();
