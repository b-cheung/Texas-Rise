import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import theme from '../styles/theme.js';

const DateTimePicker = props => {
  const { label, onChange, value, minuteInterval, ...input } = props;
  return (
    <View>
      <Text>{label}</Text>
      <DatePicker
        style={{ width: 200 }}
        date={value}
        mode="datetime"
        // format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        minuteInterval={minuteInterval}
        onDateChange={datetime => onChange(datetime)}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export { DateTimePicker };
