import React, { Component } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, register } from '../actions';
import { TextField, Button, Spinner } from '../components';
import styles from './styles';

class RegisterScreen extends Component {
  componentWillMount() {
    this.props.clearForm();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onButtonPress() {
    const { firstName, lastName, gradeLevel, email, password, confirmPassword } = this.props;
    this.props.register({
      firstName,
      lastName,
      gradeLevel,
      email,
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
    return <Button onPress={this.onButtonPress.bind(this)}>Register</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <TextField
            placeholder="First Name"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'firstName', value })}
            value={this.props.firstName}
          />
          <TextField
            placeholder="Last Name"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'lastName', value })}
            value={this.props.lastName}
          />
          <TextField
            placeholder="Grade"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'gradeLevel', value })}
            value={this.props.gradeLevel}
          />
          <TextField
            placeholder="Email"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
            value={this.props.email}
          />
          <TextField
            secureTextEntry
            placeholder="Password"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'password', value })}
            value={this.props.password}
          />
          <TextField
            secureTextEntry
            placeholder="Confirm Password"
            style={styles.input}
            onChangeText={value => this.props.inputUpdate({ prop: 'confirmPassword', value })}
            value={this.props.confirmPassword}
          />
          {this.renderError()}
          {this.renderButton()}
          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    firstName,
    lastName,
    gradeLevel,
    email,
    password,
    confirmPassword,
    error,
    loading
  } = auth;
  return {
    firstName,
    lastName,
    gradeLevel,
    email,
    password,
    confirmPassword,
    error,
    loading
  };
};

export default connect(
  mapStateToProps,
  {
    clearForm,
    inputUpdate,
    register
  }
)(RegisterScreen);
