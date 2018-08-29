import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { loginRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

const FIELDS = {
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
  }
};

class Login extends Component {
  static navigationOptions = {
    // title: 'Login'
  };

  onSubmit = values => {
    const { email, password } = values;
    this.props.loginRequest({ email, password });
  };

  render() {
    return (
      <View
        style={theme.container}
      >
        <ReduxForm
          onSubmit={this.onSubmit}
          title={{ label: 'Login', style: theme.titleStyle }}
          fields={FIELDS}
          submitName={'Login'}
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
  { loginRequest }
)(Login);
