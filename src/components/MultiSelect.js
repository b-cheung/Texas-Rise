import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = _.mapValues(props.options, () => false);
  }

  componentDidUpdate() {
    this.props.onChange(this.state);
  }

  renderSelectables(options) {
    return Object.keys(options).map(key => {
      const checked = this.state[key];
      return (
        <CheckBox
          key={key}
          title={options[key]}
          checked={checked}
          onPress={() => {
            this.setState({ [key]: !checked });
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
