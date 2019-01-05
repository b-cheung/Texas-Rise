import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, ViewContainer } from '../../../components';

class Splash extends Component {
  componentDidMount() {
    console.tron.log('splash did mount');
  }

  render() {
    return (
      <ViewContainer>
        <Spinner size="large" />
      </ViewContainer>
    );
  }
}

export default Splash;
