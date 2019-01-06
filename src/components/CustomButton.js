import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { fonts, colors, dimensions, padding, margin } from '../styles/theme';

const CustomButton = ({ onPress, children, style }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: '#A2A2A2',
    fontSize: fonts.md,
    paddingVertical: padding.md - 2
  },
  buttonStyle: {
    alignSelf: 'center',
    margin: margin.sm,
    width: dimensions.fullWidth - 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary
  }
});

export { CustomButton };
