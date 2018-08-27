import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import {
  fetchPollsRequest,
  fetchNewPollsRequest
} from '../actions';
import { getUser, getPolls } from '../selectors';
import { Button, Card, CardSection, Header } from '../../../components';
import NavigationService from '../../../core/navigation/NavigationService';
import * as authService from '../../../core/firebase/authService';
import theme from '../../../styles/theme';

class PollFeed extends Component {
  static navigationOptions = {
    title: 'Polls'
  };

  componentWillMount() {
    this.props.fetchPollsRequest();
  }

  renderRefreshButton() {
    return <Button onPress={() => this.props.fetchNewPollsRequest()}>Refresh</Button>;
  }

  renderCreateButton() {
    return (
      authService.isAdminOrOfficer(this.props.user) && (
      <Button onPress={() => NavigationService.navigate('PollCreate')}>Create</Button>
      )
    );
  }

  renderPoll(poll) {
    const { title } = poll.item;
    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ flex: 1 }}>{title}</Text>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView>
        <View>{this.renderRefreshButton()}</View>
        <View>{this.renderCreateButton()}</View>
        <FlatList
          data={this.props.polls}
          renderItem={this.renderPoll}
          keyExtractor={poll => poll.id}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.tron.log('mapStateToProps PollFeed', getPolls(state));
  return {
    user: getUser(state),
    polls: getPolls(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPollsRequest, fetchNewPollsRequest }
)(PollFeed);
