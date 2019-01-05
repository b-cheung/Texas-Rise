import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { checkVerificationStatus, sendVerificationEmail, logoutRequest } from '../actions';
import { getError } from '../selectors';
import { Card, CardSection, CustomButton, ViewContainer } from '../../../components';

class VerifyEmail extends Component {
  static navigationOptions = {
    title: 'Please Verify Email',
    headerLeft: null
  };

  componentWillMount() {
    this.props.checkVerificationStatus();
  }

  // pulldown to refresh
  onCheckVerification = () => {
    this.props.checkVerificationStatus();
  };

  onResendVerificationEmail = () => {
    this.props.sendVerificationEmail();
  };

  onLogout = () => {
    this.props.logoutRequest();
  };

  render() {
    return (
      <ViewContainer>
        <Card>
          <Text>{this.props.error}</Text>
          <CustomButton onPress={this.onCheckVerification}>Check Verification Status</CustomButton>
          <CustomButton onPress={this.onResendVerificationEmail}>
            Resend Verification Email
          </CustomButton>
          <CustomButton onPress={this.onLogout}>Logout</CustomButton>
        </Card>
      </ViewContainer>
    );
  }
}

const mapStateToProps = state => {
  return { error: getError(state) };
};

export default connect(
  mapStateToProps,
  { checkVerificationStatus, sendVerificationEmail, logoutRequest }
)(VerifyEmail);
