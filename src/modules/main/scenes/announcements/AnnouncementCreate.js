import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'native-base';
import { clearForm, inputUpdate, createAnnouncement, toggleSelectable } from '../../actions';
import { Button, Card, CardSection, Header, TextField, Selectable } from '../../../components';
import theme from '../../../../styles/theme';

class AnnouncementCreate extends Component {
  componentWillMount() {
    this.props.clearForm();
  }
  onSubmit() {
    const { title, body, membersChecked, studentsChecked, user } = this.props;
    this.props.createAnnouncement({
      title,
      body,
      membersChecked,
      studentsChecked,
      user
    });
  }

  renderPostButton() {
    return <Button onPress={this.onSubmit.bind(this)}>Post</Button>;
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
            value={this.props.title}
            onChangeText={value => this.props.inputUpdate({ prop: 'title', value })}
          />
          <TextField
            placeholder="Message"
            autoCapitalize="sentences"
            multiline
            style={theme.input}
            value={this.props.body}
            onChangeText={value => this.props.inputUpdate({ prop: 'body', value })}
          />
          <Text>Audience:</Text>
          <Selectable
            label="Members"
            value={this.props.membersChecked}
            onPress={() =>
              this.props.toggleSelectable({
                prop: 'membersChecked',
                value: this.props.membersChecked
              })
            }
          />
          <Selectable
            label="Students"
            value={this.props.studentsChecked}
            onPress={() =>
              this.props.toggleSelectable({
                prop: 'studentsChecked',
                value: this.props.studentsChecked
              })
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  const { title, body, membersChecked, studentsChecked } = state.mainReducer;
  return { title, body, membersChecked, studentsChecked, user };
};

export default connect(
  mapStateToProps,
  { clearForm, inputUpdate, createAnnouncement, toggleSelectable }
)(AnnouncementCreate);
