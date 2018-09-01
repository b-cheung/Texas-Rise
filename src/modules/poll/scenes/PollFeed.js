import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { fetchPollsRequest } from '../actions';
import { getUser, getPollFeed } from '../selectors';
import { Button, Card, CardSection, Header } from '../../../components';
import PollListItem from '../components/PollListItem';
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
    return <Button onPress={() => this.props.fetchPollsRequest()}>Refresh</Button>;
  }

  renderCreateButton() {
    return (
      authService.isAdminOrOfficer(this.props.user) && (
        <Button onPress={() => NavigationService.navigate('PollCreate')}>Create</Button>
      )
    );
  }

  renderPoll(poll) {
    return (
      <PollListItem
        onPress={() => NavigationService.navigate('PollView', { data: poll.item })}
        data={poll.item}
      />
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
  console.tron.log('mapStateToProps PollFeed', getPollFeed(state));
  return {
    user: getUser(state),
    polls: getPollFeed(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPollsRequest }
)(PollFeed);
