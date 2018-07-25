import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogout } from '../../auth/actions';
import { Card, CardSection, Button, Spinner } from '../../components';

class SettingsScreen extends Component {
  onLogout() {
    console.log('logout button pressed');
    this.props.onLogout();
  }
  
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onLogout.bind(this)}>Logout</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}


export default connect(null, { onLogout })(SettingsScreen);
