import React, { Component } from 'react';
import { Image, Animated } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import './src/core/reactotron/ReactotronConfig';
import configureStore from './src/redux/configureStore';
import { AppContainer } from './src/core/navigation/RouterConfig';
import NavigationService from './src/core/navigation/NavigationService';

const store = configureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    Font.loadAsync({
      Autery: require('./assets/fonts/Autery.ttf')
    });
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  async _loadAssetsAsync() {
		console.tron.log('load assets');
    const imageAssets = cacheImages([
      // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      require('./assets/Logo.png')
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  _handleLoadingError = error => {
    // report the error
    console.tron.log(error);
  };

  _handleFinishLoading = () => {
		console.tron.log('finished loading');
		this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      console.tron.log('render App.js AppLoading');
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    console.tron.log('render App.js Provider');
    return (
      <Provider store={store}>
        <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
      </Provider>
    );
  }
}
