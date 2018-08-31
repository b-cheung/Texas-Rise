import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import NavigationService from '../../../core/navigation/NavigationService';
import { Card, CardSection, Button, Header } from '../../../components';
import theme from '../../../styles/theme.js';
import styles from '../styles';
import ImageLoader from '../ImageLoader';

class Welcome extends Component {

  onLoginPress = () => {
    NavigationService.navigate('Login');
  }

  onRegisterPress = () => {
    NavigationService.navigate('Register');
  }

  render() {
    // const { logoContainer, logo, buttonPositions } = styles;
    return (
      <View 
        style={theme.container}
      >
        <View style={styles.logoContainer}>
          <ImageLoader
            style={styles.logo}
            source={require('../../../../assets/Logo.png')}
          />
        </View>
        <View style={styles.buttonPositions}>
            <Button 
              onPress={this.onLoginPress}
              style={{ backgroundColor: '#001B41', borderColor: '#001B41' }}
            >
              Login</Button>         
          <Text
            style={{
              alignSelf: 'center',
              color: 'gray',
              paddingBottom: 25,
              paddingTop: 25
              }}
          >
            ─────────  or  ─────────
          </Text>

            <Button 
              onPress={this.onRegisterPress}
            >
              Register
            </Button>
        </View>
      </View>
    );
  }
}

export default Welcome;
