import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { loginRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ViewContainer, TextField } from '../../../components';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

const initialValues = {
  initialValues: {
    email: 'bcheung2017@gmail.com',
    password: 'password'
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
      <ViewContainer style={theme.container}>
        <ReduxForm
          onSubmit={this.onSubmit}
          title={{ label: 'Login', style: theme.titleStyle }}
          submitName={'Login'}
          status={this.props.formStatus}
          {...initialValues}
        >
          <TextField
            name="email"
            placeholder="Email Address"
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
            validate={[required, emailFormat]}
          />
          <TextField
            name="password"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            validate={[required, minLength(8)]}
          />
        </ReduxForm>
      </ViewContainer>
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
