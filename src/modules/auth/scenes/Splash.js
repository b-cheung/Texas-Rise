import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from '../../components/Spinner';
import { auth } from '../../../core/firebase/FirebaseConfig';

class Splash extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // check if user is authenticated
  _bootstrapAsync = async () => {
    const user = await auth.currentUser;
    console.tron.log('_bootstrapAsync', user);
    
    // switch to the App or Auth 
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
