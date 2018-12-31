import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Item, Label, Input } from 'native-base';
import { margin } from '../styles/theme';

const TextField = props => {
  const { containerStyle, inputStyle, labelStyle } = styles;
  const { placeholder, ...input } = props;
  return (
		<Item floatingLabel style={containerStyle}>
      <Label style={labelStyle}>{placeholder}</Label>
      <Input
        {...input}
        style={inputStyle}
      />
    </Item>
    /*<View style={containerStyle}>
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
				// multiline={multiline}
        {...input}
        style={[inputStyle, fieldStyle]}
      />
    </View>*/
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
	labelStyle: {}
});

export { TextField };
