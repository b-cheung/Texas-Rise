import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { initializeFirebase } from '../actions';
import { Spinner } from '../components/Spinner';


class StartUpScreen extends Component {
  constructor(props) {
    super(props);
    this.props.initializeFirebase();
  }  

  render() {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  }
}

export default connect(null, { initializeFirebase })(StartUpScreen);
