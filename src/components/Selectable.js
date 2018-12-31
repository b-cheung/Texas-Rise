import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Selectable = props => {
  const { label, checked, onChange, ...input } = props;
  return (
    <CheckBox
      title={label}
      checked={checked}
      onPress={() => {
        console.tron.log('selected', input);
        onChange(!checked);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {}
});

export { Selectable };
