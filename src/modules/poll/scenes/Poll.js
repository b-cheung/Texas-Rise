import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class NewComponent extends Component {
  render() {
    return (
      <View>
        <View />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(
  mapStateToProps,
  null
)(NewComponent);
