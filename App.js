import React, { Component } from 'react';
// import { Image, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { RootNavigator } from './src/core/navigation/RouterConfig';
import NavigationService from './src/core/navigation/NavigationService';

export default class App extends Component {
  state = {
    isReady: false
  };

  _loadAssetsAsync = async () => {
    const images = [{ AppIcon: './assets/Logo.png' }];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all([...cacheImages]);
  };

  render() {
    if (!this.state.isReady) {
      console.log('render App.js AppLoading');
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    console.log('render App.js Provider');
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
