import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { TextField } from '../../../components';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat, number } from '../../form/FormValidation';
import styles from '../styles';
import theme from '../../../styles/theme';

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
          submitName={'Register'}
          status={this.props.formStatus}
        >
          <TextField
            name="firstName"
            placeholder="First Name"
            secureTextEntry={false}
            autoCapitalize="words"
            autoCorrect={false}
            validate={[required]}
            style={theme.input}
          />
          <TextField
            name="lastName"
            placeholder="Last Name"
            secureTextEntry
            autoCapitalize="words"
            autoCorrect={false}
            validate={[required]}
            style={theme.input}
          />
          <TextField
            name="year"
            placeholder="Year"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            validate={[required]}
            style={theme.input}
          />
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
          <TextField
            name="confirmPassword"
            placeholder="Confirm Password"
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
  { registerRequest }
)(RegisterScreen);
