import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import theme from '../styles/theme.js';

const TextField = props => {
  const { inputStyle, containerStyle } = styles;
  const { multiline, ...input } = props;
  const fieldStyle = multiline ? theme.textArea : theme.input;
  return (
    <View style={containerStyle}>
      <TextInput
        // placeholder={placeholder}
        // secureTextEntry={secureTextEntry}
        // autoCorrect={false}
        // autoCapitalize={autoCapitalize}
        // numberOfLines={numberOfLines}
        // value={props.value}
        // onChangeText={props.onChangeText}
        // onBlur={props.onBlur}
        // onFocus={props.onFocus}
        {...input}
        multiline={multiline}
        style={[inputStyle, fieldStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#001B41',
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE'
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  }
});

export { TextField };
