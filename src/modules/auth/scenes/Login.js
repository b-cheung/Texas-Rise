import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';
import { ReduxForm, Button, Spinner, TextField } from '../../../components';
import { required, minLength, schoolEmail } from '../../../core/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

const FIELDS = {
  email: {
    type: 'TextField',
    placeholder: 'Email',
    secureTextEntry: false,
    autoCapitalize: 'none',
    validate: [required]
  },
  password: {
    type: 'TextField',
    placeholder: 'Password',
    secureTextEntry: true,
    autoCapitalize: 'none',
    validate: [required, minLength(8)]
  }
};

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  onSubmit = values => {
    const { email, password } = values;
    console.tron.log('onSubmit', email, password);
    this.props.loginRequest({ email, password });
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.onSubmit}
        fields={FIELDS}
        submitName={'Login'}
        submitError={this.props.error}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = state => {
  const { error, loading, user } = state.auth;
  console.tron.log('mapStateToProps error', error);
  return { error, loading, user };
};

export default connect(
  mapStateToProps,
  { loginRequest }
)(Login);
