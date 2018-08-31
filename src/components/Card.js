import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  const { containerStyle } = styles;
  return (
    <View style={[containerStyle, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: 'transparent',
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
});

export { Card };
