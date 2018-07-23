import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clearForm, inputUpdate, login } from '../actions';
import { Card, CardSection, Button, Spinner, TextField } from '../../components';
import styles from '../styles';
import NavigationService from '../../../core/navigation/NavigationService';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  componentWillMount() {
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
          <TextField
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={value => this.props.inputUpdate({ prop: 'email', value })}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <TextField
            secureTextEntry
            placeholder="Password"
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

const mapStateToProps = state => {
  const { email, password, error, loading, user } = state.authReducer;
  return { email, password, error, loading, user };
};

export default connect(
  mapStateToProps,
  {
    clearForm,
    inputUpdate,
    login
  }
)(Login);
