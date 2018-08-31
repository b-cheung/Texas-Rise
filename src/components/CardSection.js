import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = ({ children, style }) => {
  const { containerStyle } = styles;
  return (
    <View style={[containerStyle, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: 'gray',
    // position: 'relative',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
});

export { CardSection };
