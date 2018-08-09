import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import {
  fetchAnnouncementsRequest,
  fetchNewAnnouncementsRequest,
  fetchOldAnnouncementsRequest
} from '../../actions';
import { Button, Card, CardSection, Header } from '../../../components';
import NavigationService from '../../../../core/navigation/NavigationService';
import * as authService from '../../../../core/firebase/authService';
import theme from '../../../../styles/theme';

class AnnouncementFeed extends Component {
  componentWillMount() {
    this.props.fetchAnnouncementsRequest({ num: 5, userRole: this.props.user.role });
  }

  renderRefreshButton() {
    return (
      <Button
        onPress={() => {
          const timestamp = this.props.announcements[0].timestamp;
          console.tron.log('renderRefreshButton', timestamp);
          this.props.fetchNewAnnouncementsRequest({
            num: 5,
            userRole: this.props.user.role,
            timestamp
          });
        }}
      >
        Refresh
      </Button>
    );
  }

  renderLoadMoreButton() {
    return (
      <Button
        onPress={() => {
          const timestamp = this.props.announcements[this.props.announcements.length - 1].timestamp;
          console.tron.log('renderLoadMoreButton', this.props.announcements.length, timestamp);
          this.props.fetchOldAnnouncementsRequest({
            num: 5,
            userRole: this.props.user.role,
            timestamp
          });
        }}
      >
        Load More
      </Button>
    );
  }

  renderCreateButton() {
    return (
      // authService.isAdminOrOfficer(this.props.user) && (
      <Button onPress={() => NavigationService.navigate('AnnouncementCreate')}>Create</Button>
      // )
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
        <View>{this.renderRefreshButton()}</View>
        <View>{this.renderLoadMoreButton()}</View>
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
  const announcements = state.mainReducer.announcements;
  console.tron.log(announcements);
  return { user, announcements };
};

export default connect(
  mapStateToProps,
  { fetchAnnouncementsRequest, fetchNewAnnouncementsRequest, fetchOldAnnouncementsRequest }
)(AnnouncementFeed);
