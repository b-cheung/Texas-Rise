import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList, 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  fetchAnnouncementsRequest,
  fetchNewAnnouncementsRequest,
  fetchOldAnnouncementsRequest
} from '../actions';
import { getUser, getAnnouncementFeed } from '../selectors';
import { CustomButton, Card, CardSection, Header, ViewContainer } from '../../../components';
import AnnouncementListItem from '../components/AnnouncementListItem';
import NavigationService from '../../../core/navigation/NavigationService';
import * as fbAuth from '../../../core/firebase/fbAuth';
import theme from '../../../styles/theme';
import styles from '../styles';

class AnnouncementFeed extends Component {
  static navigationOptions = {
    title: 'Announcements',
  };

  componentWillMount() {
    this.props.fetchAnnouncementsRequest();
  }

  renderRefreshButton() {
    return <Icon name='rotate-ccw' size={20} onPress={() => this.props.fetchNewAnnouncementsRequest()} />;
  }

  renderLoadMoreButton() {
    return <CustomButton onPress={() => this.props.fetchOldAnnouncementsRequest()}>Load More</CustomButton>;
  }

  renderCreateButton() {
    return (
      fbAuth.isAdminOrOfficer(this.props.user) && (
        <CustomButton onPress={() => NavigationService.navigate('AnnouncementCreate')}>Create</CustomButton>
      )
    );
  }

  renderAnnouncement(announcement) {
    return (
      <AnnouncementListItem
        onPress={() => NavigationService.navigate('AnnouncementView', { data: announcement.item })}
        data={announcement.item}
      />
//       <Card style={{ marginLeft: 0, marginRight: 0 }}>
//         <CardSection>
//           {/* <Text style={{ flex: 1 }}>{title}</Text> */}
//           <Text style={styles.textStyle}>{body}</Text>
//         </CardSection>
//       </Card>
    );
  }

  render() {
    return (
      <ViewContainer style={styles.announcementStyle}>
        <ScrollView>
            {/* <Header headerText="AnnouncementFeed" /> */}
            <View>{this.renderRefreshButton()}</View>
            <View>{this.renderCreateButton()}</View>
            <FlatList
              data={this.props.announcementFeed}
              
              renderItem={this.renderAnnouncement}
              keyExtractor={announcement => announcement.id}
            />
            <View>{this.renderLoadMoreButton()}</View>
        </ScrollView>
      </ViewContainer>
    );
  }
}

const mapStateToProps = state => {
  console.tron.log('mapStateToProps AnnouncementFeed');
  return {
    user: getUser(state),
    announcementFeed: getAnnouncementFeed(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchAnnouncementsRequest, fetchNewAnnouncementsRequest, fetchOldAnnouncementsRequest }
)(AnnouncementFeed);
