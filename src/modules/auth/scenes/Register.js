import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat, number } from '../../form/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

const FIELDS = {
  firstName: {
    type: 'TextField',
    label: 'First Name',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  lastName: {
    type: 'TextField',
    label: 'Last Name',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  year: {
    type: 'TextField',
    label: 'Year',
    secureTextEntry: false,
    autoCapitalize: 'none',
    validate: [required, number]
  },
  email: {
    type: 'TextField',
    label: 'Email',
    secureTextEntry: false,
    autoCapitalize: 'none',
    validate: [required, emailFormat]
  },
  password: {
    type: 'TextField',
    label: 'Password',
    secureTextEntry: true,
    autoCapitalize: 'none',
    validate: [required, minLength(8)]
  },
  confirmPassword: {
    type: 'TextField',
    label: 'Confirm Password',
    secureTextEntry: true,
    autoCapitalize: 'none',
    validate: [required, minLength(8)]
  }
};

class RegisterScreen extends Component {
  // static navigationOptions = {
  //   title: 'Register'
  // };

  onSubmit = values => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    const year = parseInt(values.year);
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
      <View style={theme.container}>
        <ReduxForm
          onSubmit={this.onSubmit}
          title={{ label: 'Register', style: theme.titleStyle }}
          fields={FIELDS}
          submitName={'Register'}
          status={this.props.formStatus}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    formStatus: getFormStatus(state)
  };
};

export default connect(
  mapStateToProps,
  { registerRequest }
)(RegisterScreen);
