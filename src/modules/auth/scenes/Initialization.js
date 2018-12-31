import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { initializationStart } from '../actions';
import { Spinner, ViewContainer } from '../../../components';

class Initialization extends Component {
  componentDidMount() {
    console.tron.log('Initialization did mount');
    // this._bootstrapAsync();
    this.props.initializationStart();
  }

  // check if user is authenticated
  _bootstrapAsync = async () => {
    // const user = await auth.currentUser;
    console.tron.log('_bootstrapAsync');
  };

  render() {
    return (
      <ViewContainer>
        <Spinner size="large" />
      </ViewContainer>
    );
  }
}

export default connect(null, { initializationStart })(Initialization);
