import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'native-base';
import { createAnnouncementRequest } from '../../actions';
import { Button, Card, CardSection, Header, TextField, Selectable } from '../../../components';
import theme from '../../../../styles/theme';

class AnnouncementCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      member: false,
      student: false
    };
  }

  handleSubmit() {
    const { title, body, member, student } = this.state;
    const { user } = this.props;
    this.props.createAnnouncementRequest({
      title,
      body,
      member,
      student,
      user
    });
  }

  renderPostButton() {
    return <Button onPress={this.handleSubmit.bind(this)}>Post</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView style={theme.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <Header headerText="AnnouncementCreate" />
          <View>{this.renderPostButton()}</View>
          <TextField
            placeholder="Title"
            autoCapitalize="words"
            style={theme.input}
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextField
            placeholder="Message"
            autoCapitalize="sentences"
            multiline
            style={theme.input}
            value={this.state.body}
            onChangeText={body => this.setState({ body })}
          />
          <Text>Audience:</Text>
          <Selectable
            label="Members"
            value={this.state.member}
            onPress={() => this.setState({ member: !this.state.member })}
          />
          <Selectable
            label="Students"
            value={this.state.student}
            onPress={() => this.setState({ student: !this.state.student })}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  return { user };
};

export default connect(
  mapStateToProps,
  { createAnnouncementRequest }
)(AnnouncementCreate);
