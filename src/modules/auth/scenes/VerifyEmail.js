import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkVerificationStatus, sendVerificationEmail, logoutRequest } from '../actions';
import { Card, CardSection, Button } from '../../../components';

class VerifyEmail extends Component {
  static navigationOptions = {
    title: 'Please Verify Email',
    headerLeft: null
  };

  componentWillMount() {
    this.props.checkVerificationStatus();
  }

  onCheckVerification = () => {
    this.props.checkVerificationStatus();
  }

  onResendVerificationEmail = () => {
    this.props.sendVerificationEmail();
  }

  onLogout = () => {
    this.props.logoutRequest();
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onCheckVerification}>Check Verification Status</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onResendVerificationEmail}>Resend Verification Email</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onLogout}>Logout</Button>
        </CardSection>
      </Card>
    );
  }
}

export default connect(
  null,
  { checkVerificationStatus, sendVerificationEmail, logoutRequest }
)(VerifyEmail);
