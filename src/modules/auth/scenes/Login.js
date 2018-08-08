import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, loginRequest } from '../actions';
import { Button, Spinner, TextField } from '../../components';
import styles from '../styles';
import theme from '../../../styles/theme';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
    this.props.clearForm();
  }

  onSubmit() {
    const { email, password } = this.props;
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
    return <Button onPress={this.onSubmit.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
            <TextField
              placeholder="Email"
              autoCapitalize="none"
              value={this.props.email}
              onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
            />
            <TextField
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              value={this.props.password}
              onChangeText={value => this.props.inputUpdate({ prop: 'password', value })}
            />
          {this.renderError()}
          {this.renderButton()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const { email, password, error, loading, user } = state.authReducer;
  return { email, password, error, loading, user };
};

export default connect(
  mapStateToProps,
  {
    clearForm,
    inputUpdate,
    loginRequest
  }
)(Login);
