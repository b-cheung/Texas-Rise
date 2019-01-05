import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { initializationStart } from '../actions';
import { Spinner, ViewContainer } from '../../../components';
import NavigationService from '../../../core/navigation/NavigationService';

class Initialization extends Component {
  componentDidMount() {
		console.tron.log('Initialization did mount');
		this.props.initializationStart();
  }

  // check if user is authenticated
  _initAsync = async () => {
    // const user = await auth.currentUser;
    // console.tron.log('_initAsync');
  };

  render() {
    return (
      <ViewContainer>
        <Text>Initialization</Text>
      </ViewContainer>
    );
  }
}

export default connect(null, { initializationStart })(Initialization);
