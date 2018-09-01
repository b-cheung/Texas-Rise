import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchPollResultsRequest } from '../actions';
import { getUser, getPollResults } from '../selectors';

class PollResults extends Component {
  componentWillMount() {
    const pollId = this.props.pollData.id;
    console.tron.log('PollResults componentWillMount', this.props.pollData, pollId);
    this.props.fetchPollResultsRequest(pollId);
  }

  render() {
    const { pollData, pollResults } = this.props;
    console.tron.log('PollResults render', pollResults);
    return (
      <View>
        <Text>{pollData.title}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    pollResults: getPollResults(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPollResultsRequest }
)(PollResults);
