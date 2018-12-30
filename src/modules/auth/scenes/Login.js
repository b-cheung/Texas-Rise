import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { loginRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { TextField } from '../../../components';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

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
      <View style={theme.container}>
        <ReduxForm
          onSubmit={this.onSubmit}
          title={{ label: 'Login', style: theme.titleStyle }}
          submitName={'Login'}
          status={this.props.formStatus}
        >
          <TextField
            name="email"
            placeholder="Email Address"
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
            validate={[required, emailFormat]}
            style={theme.input}
          />
          <TextField
            name="password"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            validate={[required, minLength(8)]}
            style={theme.input}
          />
        </ReduxForm>
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
