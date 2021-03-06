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
import { Button, Card, CardSection, Header } from '../../../components';
import AnnouncementListItem from '../components/AnnouncementListItem';
import NavigationService from '../../../core/navigation/NavigationService';
import * as authService from '../../../core/firebase/authService';
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
    return <Button onPress={() => this.props.fetchOldAnnouncementsRequest()}>Load More</Button>;
  }

  renderCreateButton() {
    return (
      authService.isAdminOrOfficer(this.props.user) && (
        <Icon 
        // DOES NOT POSITION TO RIGHT
          name='plus' 
          size={20} 
          justifyContent='flex-end' 
          flexDirection='row' 
          onPress={() => NavigationService.navigate('AnnouncementCreate')} 
          
        />
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
      <View style={styles.announcementStyle}>
        <ScrollView>
            {/* <Header headerText="AnnouncementFeed" /> */}
            <View style={{ paddingLeft: 5 }}>{this.renderRefreshButton()}</View>
            <View style={{ position: 'absolute', alignSelf: 'flex-end', paddingRight: 5 }}>{this.renderCreateButton()}</View>
            <FlatList
              data={this.props.announcementFeed}
              renderItem={this.renderAnnouncement}
              keyExtractor={announcement => announcement.id}
            />
            <View>{this.renderLoadMoreButton()}</View>
        </ScrollView>
      </View>
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
