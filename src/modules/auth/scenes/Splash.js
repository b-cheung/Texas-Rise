import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, ViewContainer } from '../../../components';

class Splash extends Component {
  componentDidMount() {
    console.tron.log('splash did mount');
    // this._bootstrapAsync();
    // this.props.initializationStart();
  }

  // check if user is authenticated
  _bootstrapAsync = async () => {
    // const user = await auth.currentUser;
    console.tron.log('_bootstrapAsync');
  };

  render() {
    return (
      <ViewContainer>
        <Spinner size="large" />
      </ViewContainer>
    );
  }
}

export default Splash;
