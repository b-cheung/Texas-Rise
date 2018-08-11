import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
  renderView() {
    if (this.props.user !== null) {
      return (
        <View>
          <Text>{this.props.user.uid}</Text>
          <Text>{this.props.user.firstName}</Text>
          <Text>{this.props.user.lastName}</Text>
          <Text>{this.props.user.email}</Text>
          <Text>{this.props.user.role}</Text>
          <Text>{this.props.user.year}</Text>
        </View>
      );
    }

    return (
      <Text>Props not loaded.</Text>
    );
  }

  render() {
    return (
      <View>
        {this.renderView()}
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
)(Home);
