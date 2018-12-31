import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

const ViewContainer = ({ children, style }) => {
  const { containerStyle } = styles;
  return (
    <Container style={[containerStyle, style]}>{children}</Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
   
  }
});

export { ViewContainer };
