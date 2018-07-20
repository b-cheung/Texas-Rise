import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, register } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components';

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register'
  };

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
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="Bob"
            onChangeText={value => this.props.inputUpdate({ prop: 'firstName', value })}
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Chen"
            onChangeText={value => this.props.inputUpdate({ prop: 'lastName', value })}
            value={this.props.lastName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Grade Level"
            placeholder="9"
            onChangeText={value => this.props.inputUpdate({ prop: 'gradeLevel', value })}
            value={this.props.gradeLevel}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
            onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={value => this.props.inputUpdate({ prop: 'password', value })}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Confirm Password"
            placeholder="password"
            onChangeText={value => this.props.inputUpdate({ prop: 'confirmPassword', value })}
            value={this.props.confirmPassword}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

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
