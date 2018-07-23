import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
  componentWillMount() {
    console.log('Home componentWillMount');
  }

  render() {
    return (
      <View>
        <Text>HOME</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  console.log('Home mapStateToProps:', user);
  return { user };
};

export default connect(
  mapStateToProps,
  null
)(Home);
