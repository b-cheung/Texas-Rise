import React from 'react';
import { TextInput, View } from 'react-native';

const TextField = ({ value, onChangeText, placeholder, style, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle, style]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
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
};

export { TextField };
