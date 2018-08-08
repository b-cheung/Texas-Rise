import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, registerRequest } from '../actions';
import { TextField, Button, Spinner } from '../../components';
import styles from '../styles';
import theme from '../../../styles/theme';

class RegisterScreen extends Component {
  componentWillMount() {
    this.props.clearForm();
  }

  onSubmit() {
    const { firstName, lastName, year, email, role, password, confirmPassword } = this.props;
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
    return <Button onPress={this.onSubmit.bind(this)}>Submit</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <TextField
            placeholder="First Name"
            autoCapitalize="words"
            style={theme.input}
            value={this.props.firstName}
            onChangeText={value => this.props.inputUpdate({ prop: 'firstName', value })}
          />
          <TextField
            placeholder="Last Name"
            autoCapitalize="words"
            style={theme.input}
            value={this.props.lastName}
            onChangeText={value => this.props.inputUpdate({ prop: 'lastName', value })}
          />
          <TextField
            placeholder="Year"
            autoCapitalize="none"
            style={theme.input}
            value={this.props.year}
            onChangeText={value => this.props.inputUpdate({ prop: 'year', value })}
          />
          <TextField
            placeholder="Email"
            autoCapitalize="none"
            style={theme.input}
            value={this.props.email}
            onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
          />
          <TextField
            placeholder="Role"
            autoCapitalize="none"
            style={theme.input}
            value={this.props.role}
            onChangeText={value => this.props.inputUpdate({ prop: 'role', value })}
          />
          <TextField            
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            style={theme.input}
            value={this.props.password}
            onChangeText={value => this.props.inputUpdate({ prop: 'password', value })}
          />
          <TextField
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            style={theme.input}
            value={this.props.confirmPassword}
            onChangeText={value => this.props.inputUpdate({ prop: 'confirmPassword', value })}
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
  const {
    firstName,
    lastName,
    year,
    email,
    role,
    password,
    confirmPassword,
    error,
    loading,
    user
  } = state.authReducer;
  return {
    firstName,
    lastName,
    year,
    email,
    role,
    password,
    confirmPassword,
    error,
    loading,
    user
  };
};

export default connect(
  mapStateToProps,
  {
    clearForm,
    inputUpdate,
    registerRequest
  }
)(RegisterScreen);
