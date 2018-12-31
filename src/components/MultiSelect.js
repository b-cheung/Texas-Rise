import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class MultiSelect extends Component {
  state = { value: [] };

  componentDidUpdate() {
		console.tron.log(this.state);
		this.props.onChange(this.state.value);
  }

  renderSelectables(options) {
    return options.map(option => {
      const checked = this.state.value.includes(option);
      return (
        <CheckBox
          key={option}
          title={option}
          checked={checked}
          onPress={() => {
            if (checked) {
              this.setState({
                value: this.state.value.filter(i => {
                  return i !== option;
                })
              });
            } else {
              this.setState({
                value: [...this.state.value, option]
              });
            }
          }}
        />
      );
    });
  }

  render() {
    return <View>{this.renderSelectables(this.props.options)}</View>;
  }
}

const styles = StyleSheet.create({
  containerStyle: {}
});

export { MultiSelect };
