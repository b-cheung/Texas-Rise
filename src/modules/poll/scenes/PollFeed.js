import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { fetchPollsRequest } from '../actions';
import { getUser, getPollFeed } from '../selectors';
import { CustomButton, Card, CardSection, Header } from '../../../components';
import PollListItem from '../components/PollListItem';
import NavigationService from '../../../core/navigation/NavigationService';
import { isAdminOrOfficer } from '../../../core/firebase/fbAuth';
import theme from '../../../styles/theme';

class PollFeed extends Component {
  static navigationOptions = {
    title: 'Polls'
  };

  componentWillMount() {
    this.props.fetchPollsRequest();
  }

  renderRefreshButton() {
    return <CustomButton onPress={() => this.props.fetchPollsRequest()}>Refresh</CustomButton>;
  }

  renderCreateButton() {
    return (
      isAdminOrOfficer(this.props.user) && (
        <CustomButton onPress={() => NavigationService.navigate('PollCreate')}>Create</CustomButton>
      )
    );
  }

  renderPoll(poll) {
    return (
      <PollListItem
        onPress={() => NavigationService.navigate('PollView', { pollId: poll.item.id })}
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
          data={this.props.pollFeed}
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
    pollFeed: getPollFeed(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPollsRequest }
)(PollFeed);
