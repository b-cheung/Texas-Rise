import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, onLogin } from '../actions';
import { Card, CardSection, Button, Spinner, TextField } from '../../components';
import styles from '../styles';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
    this.props.clearForm();
  }

  onSubmit() {
    const { email, password } = this.props;
    this.props.onLogin({ email, password });
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
      <Card>
        <CardSection>
          <TextField
            placeholder="Email"
            autoCapitalize="none"
            value={this.props.email}
            onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
          />
        </CardSection>
        <CardSection>
          <TextField
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={this.props.password}
            onChangeText={value => this.props.inputUpdate({ prop: 'password', value })}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
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
    onLogin
  }
)(Login);
