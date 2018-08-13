import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../../auth/actions';
import { Card, CardSection, Button, Spinner } from '../../../components';

class SettingsScreen extends Component {
  onLogout = () => {
    this.props.logoutRequest();
  }
  
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onLogout}>Logout</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}


export default connect(null, { logoutRequest })(SettingsScreen);
