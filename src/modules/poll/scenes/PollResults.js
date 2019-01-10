import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchPollResultsRequest } from '../actions';
import { getUser, getPollData, getPollResults } from '../selectors';

class PollResults extends Component {
  componentWillMount() {
    const pollId = this.props.pollId;
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

const mapStateToProps = (state, props) => {
  return {
    user: getUser(state),
    pollData: getPollData(state, props.pollId),
    pollResults: getPollResults(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPollResultsRequest }
)(PollResults);
