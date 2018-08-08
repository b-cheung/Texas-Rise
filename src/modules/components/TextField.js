import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const TextField = ({
  id,
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry,
  autoCapitalize,
  multiline,
  numberOfLines
}) => {
  const { inputStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[inputStyle, style]}
        id={id}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 25,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
  },
  containerStyle: {
    height: 55,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  }
});

export { TextField };
