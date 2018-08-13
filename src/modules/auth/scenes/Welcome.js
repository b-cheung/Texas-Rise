import React, { Component } from 'react';
import NavigationService from '../../../core/navigation/NavigationService';
import { Card, CardSection, Button } from '../../../components';

class Welcome extends Component {
  static navigationOptions = {
    title: 'Texas Rise'
  };

  onLoginPress = () => {
    NavigationService.navigate('Login');
  }

  onRegisterPress = () => {
    NavigationService.navigate('Register');
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onLoginPress}>Login</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onRegisterPress}>Register</Button>
        </CardSection>
      </Card>
    );
  }
}

export default Welcome;
