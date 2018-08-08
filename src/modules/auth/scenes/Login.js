import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';
import { Button, Spinner, TextField } from '../../components';
import styles from '../styles';
import theme from '../../../styles/theme';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit() {
    const { email, password } = this.state;
    this.props.loginRequest({ email, password });
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
    return <Button onPress={this.handleSubmit.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <TextField
            placeholder="Email"
            autoCapitalize="none"
            style={theme.input}
            id="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
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
          {this.renderError()}
          {this.renderButton()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const { error, loading, user } = state.authReducer;
  return { error, loading, user };
};

export default connect(
  mapStateToProps,
  { loginRequest }
)(Login);
