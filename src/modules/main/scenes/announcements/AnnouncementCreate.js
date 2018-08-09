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
      members: false,
      students: false
    };
  }

  handleSubmit() {
    const { title, body, members, students } = this.state;
    const { user } = this.props;
    this.props.createAnnouncementRequest({
      title,
      body,
      members,
      students,
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
            value={this.state.members}
            onPress={() => this.setState({ members: !this.state.members })}
          />
          <Selectable
            label="Students"
            value={this.state.students}
            onPress={() => this.setState({ students: !this.state.students })}
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
