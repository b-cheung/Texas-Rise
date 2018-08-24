import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import {
  fetchAnnouncementsRequest,
  fetchNewAnnouncementsRequest,
  fetchOldAnnouncementsRequest
} from '../actions';
import { getUser, getAnnouncements } from '../selectors';
import { Button, Card, CardSection, Header } from '../../../components';
import NavigationService from '../../../core/navigation/NavigationService';
import * as authService from '../../../core/firebase/authService';
import theme from '../../../styles/theme';

class AnnouncementFeed extends Component {
  static navigationOptions = {
    title: 'Announcements'
  };

  componentWillMount() {
    this.props.fetchAnnouncementsRequest();
  }

  renderRefreshButton() {
    return <Button onPress={() => this.props.fetchNewAnnouncementsRequest()}>Refresh</Button>;
  }

  renderLoadMoreButton() {
    return <Button onPress={() => this.props.fetchOldAnnouncementsRequest()}>Load More</Button>;
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
        {/* <Header headerText="AnnouncementFeed" /> */}
        <View>{this.renderRefreshButton()}</View>
        <View>{this.renderCreateButton()}</View>
        <FlatList
          data={this.props.announcements}
          renderItem={this.renderAnnouncement}
          keyExtractor={announcement => announcement.id}
        />
        <View>{this.renderLoadMoreButton()}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.tron.log('mapStateToProps AnnouncementFeed');
  return {
    user: getUser(state),
    announcements: getAnnouncements(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchAnnouncementsRequest, fetchNewAnnouncementsRequest, fetchOldAnnouncementsRequest }
)(AnnouncementFeed);
