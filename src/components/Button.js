import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, children, style }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#A2A2A2',
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 18,
    paddingBottom: 18
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#FFE6A7',
    // height: 50,
    width: 300,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE6A7',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5
  }
});

export { Button };
