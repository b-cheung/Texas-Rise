import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import NavigationService from './src/navigators/NavigationService';

export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));

    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
