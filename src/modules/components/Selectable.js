import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox, Body } from 'native-base';

const Selectable = ({ value, color, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <CheckBox checked={value} color={color} />
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
