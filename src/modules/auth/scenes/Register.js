import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import { ReduxForm, TextField, Button, Spinner } from '../../../components';
import { required, minLength, schoolEmail, number } from '../../../core/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

const FIELDS = {
  firstName: {
    type: 'TextField',
    placeholder: 'First Name',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  lastName: {
    type: 'TextField',
    placeholder: 'Last Name',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  year: {
    type: 'TextField',
    placeholder: 'Year',
    secureTextEntry: false,
    autoCapitalize: 'none',
    validate: [required, number]
  },
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
  },
  confirmPassword: {
    type: 'TextField',
    placeholder: 'Confirm Password',
    secureTextEntry: true,
    autoCapitalize: 'none',
    validate: [required, minLength(8)]
  }
};

class RegisterScreen extends Component {
  onSubmit = values => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    const year = parseInt(values.year);
    console.tron.log('onSubmit', firstName, lastName, year, email, password, confirmPassword);
    this.props.registerRequest({
      firstName,
      lastName,
      year,
      email,
      password,
      confirmPassword
    });
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.onSubmit}
        fields={FIELDS}
        submitName={'Register'}
        submitError={this.props.error}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = state => {
  const { error, loading, user } = state.auth;
  return {
    error,
    loading,
    user
  };
};

export default connect(
  mapStateToProps,
  {
    registerRequest
  }
)(RegisterScreen);
