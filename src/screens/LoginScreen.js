import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, login } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
    this.props.clearForm();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.login({ email, password });
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
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <Card>
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
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  {
    clearForm,
    inputUpdate,
    login
  }
)(LoginScreen);
