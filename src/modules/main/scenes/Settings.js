import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../../auth/actions';
import { Card, CardSection, CustomButton, Spinner } from '../../../components';

class SettingsScreen extends Component {
  onLogout = () => {
    this.props.logoutRequest();
  }
  
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <CustomButton onPress={this.onLogout}>Logout</CustomButton>;
  }

  render() {
    return (
        <CardSection
          style={{
            alignSelf: 'center',
            left: 0,
            right: 0,
            bottom: 40,
            top: 250,
            height: 200,
            padding: 20
          }}

        >
          {this.renderButton()}
        </CardSection>
    );
  }
}


export default connect(null, { logoutRequest })(SettingsScreen);
