import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox, Body } from 'native-base';

const Selectable = props => {
  const { label, checked, onChange, ...input } = props;
  return (
    <TouchableOpacity onPress={() => onChange(!checked)}>
      <View style={styles.container}>
        <CheckBox
          checked={checked}
          // color={color}
        />
        <Body>
          <Text>{label}</Text>
        </Body>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
});

export { Selectable };
