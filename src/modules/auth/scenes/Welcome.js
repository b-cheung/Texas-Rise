import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import NavigationService from '../../../core/navigation/NavigationService';
import { Card, CardSection, Button } from '../../components';

class Welcome extends Component {
  static navigationOptions = {
    title: 'Texas Rise'
  };

  onLoginPress() {
    NavigationService.navigate('Login');
  }

  onRegisterPress() {
    NavigationService.navigate('Register');
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onLoginPress.bind(this)}>Login</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onRegisterPress.bind(this)}>Register</Button>
        </CardSection>
      </Card>
    );
  }
}

export default Welcome;
