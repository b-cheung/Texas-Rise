import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigator from './src/core/navigation/RouterConfig';
import NavigationService from './src/core/navigation/NavigationService';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
