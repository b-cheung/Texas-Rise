import React, { Component } from 'react';
import { View } from 'react-native';

import { Spinner } from '../../components/Spinner';
import { auth } from '../../../core/firebase/FirebaseConfig';

class Splash extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await auth.currentUser;
    console.log('_bootstrapAsync', user);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  }
}

export default Splash;
