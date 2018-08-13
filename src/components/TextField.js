import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const TextField = props => {
  const { inputStyle, containerStyle } = styles;
  const { style, ...input } = props;

  return (
    <View style={containerStyle}>
      <TextInput
        // placeholder={placeholder}
        // secureTextEntry={secureTextEntry}
        // autoCorrect={false}
        // autoCapitalize={autoCapitalize}
        // multiline={multiline}
        // numberOfLines={numberOfLines}
        {...input}
        style={[inputStyle, style]}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
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
