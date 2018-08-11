import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import { TextField, Button, Spinner } from '../../components';
import styles from '../styles';
import theme from '../../../styles/theme';

class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      year: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = () => {
    const { firstName, lastName, year, email, role, password, confirmPassword } = this.state;
    this.props.registerRequest({
      firstName,
      lastName,
      year,
      email,
      role,
      password,
      confirmPassword
    });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.handleSubmit}>Submit</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <TextField
            placeholder="First Name"
            autoCapitalize="words"
            style={theme.input}
            id="firstName"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
          <TextField
            placeholder="Last Name"
            autoCapitalize="words"
            style={theme.input}
            id="lastName"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
          <TextField
            placeholder="Year"
            autoCapitalize="none"
            style={theme.input}
            id="year"
            value={this.state.year}
            onChangeText={year => this.setState({ year })}
          />
          <TextField
            placeholder="Email"
            autoCapitalize="none"
            style={theme.input}
            id="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextField
            placeholder="Role"
            autoCapitalize="none"
            style={theme.input}
            id="role"
            value={this.state.role}
            onChangeText={role => this.setState({ role })}
          />
          <TextField
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            style={theme.input}
            id="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TextField
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            style={theme.input}
            id="confirmPassword"
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
          />
          {this.renderError()}
          {this.renderButton()}
          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
