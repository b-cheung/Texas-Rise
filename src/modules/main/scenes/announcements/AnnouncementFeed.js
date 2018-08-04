import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { fetchAnnouncements } from '../../actions';
import { Button, Card, CardSection, Header } from '../../../components';
import NavigationService from '../../../../core/navigation/NavigationService';
import * as authService from '../../../../core/firebase/authService';
import theme from '../../../../styles/theme';

class AnnouncementFeed extends Component {
  componentWillMount() {
    this.props.fetchAnnouncements(5);
  }

  renderCreateButton() {
    return (
      authService.isAdminOrOfficer(this.props.user) && (
        <Button onPress={() => NavigationService.navigate('AnnouncementCreate')}>Create</Button>
      )
    );
  }

  renderAnnouncement(announcement) {
    const { title, body } = announcement.item;
    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ flex: 1 }}>{title}</Text>
          <Text style={{ flex: 1 }}>{body}</Text>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView>
        <Header headerText="AnnouncementFeed" />
        <View>{this.renderCreateButton()}</View>
        <FlatList
          data={this.props.announcements}
          renderItem={this.renderAnnouncement}
          keyExtractor={announcement => announcement.id}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  const announcements = _.map(state.mainReducer.announcements, (val, id) => {
    return { ...val, id };
  });
  return { user, announcements };
};

export default connect(
  mapStateToProps,
  { fetchAnnouncements }
)(AnnouncementFeed);
