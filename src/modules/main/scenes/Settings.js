import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../../auth/actions';
import { CustomButton, Spinner, ViewContainer } from '../../../components';

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
        <ViewContainer>
          {this.renderButton()}
        </ViewContainer>
    );
  }
}

export default connect(null, { logoutRequest })(SettingsScreen);
