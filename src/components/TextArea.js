import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Textarea } from 'native-base';
import { margin } from '../styles/theme';

const TextArea = props => {
  const { containerStyle, inputStyle } = styles;
  const { placeholder, ...input } = props;
  return (
    <View style={containerStyle}>
      <Textarea {...input} rowSpan={5} bordered placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    margin: margin.sm
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // flex: 1
  },
  inputStyle: {
    // color: '#001B41',
    // paddingRight: 5,
    // paddingLeft: 10,
    // fontSize: 18,
    // lineHeight: 23,
    // flex: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#DEDEDE'
  },
});

export { TextArea };
