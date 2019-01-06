import _ from 'lodash';
import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { fonts, colors, dimensions, padding, margin } from '../styles/theme';

const renderPickerItems = items => {
  return _.map(items, (value, key) => {
    return <Picker.Item key={key} label={value} value={key} />;
  });
};

const CustomPicker = ({ label, items, onChange, value }) => {
  return (
    <View>
      <Text>{label}</Text>
      <Picker selectedValue={value} onValueChange={newVal => onChange(newVal)}>
        {renderPickerItems(items)}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({});

export { CustomPicker };
