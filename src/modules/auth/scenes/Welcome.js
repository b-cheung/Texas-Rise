import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import NavigationService from '../../../core/navigation/NavigationService';
import { Card, CardSection, CustomButton, Header, ViewContainer } from '../../../components';
import ImageLoader from '../ImageLoader';
import theme, { colors } from '../../../styles/theme';
import styles from '../styles';

class Welcome extends Component {
  onLoginPress = () => {
    NavigationService.navigate('Login');
  };

  onRegisterPress = () => {
    NavigationService.navigate('Register');
  };

  render() {
    // const { logoContainer, logo, buttonPositions } = styles;
    return (
      <ViewContainer style={theme.container}>
        <View style={styles.logoContainer}>
          <ImageLoader style={styles.logo} source={require('../../../../assets/Logo.png')} />
        </View>
        <View style={styles.buttonPositions}>
          <CustomButton
            onPress={this.onLoginPress}
            style={{ backgroundColor: colors.secondary, borderColor: colors.secondary }}
          >
            Login
          </CustomButton>
          <CustomButton onPress={this.onRegisterPress}>Register</CustomButton>
        </View>
      </ViewContainer>
    );
  }
}

export default Welcome;
