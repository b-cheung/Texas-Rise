import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchPollResults } from '../actions';

class PollResults extends Component {
  componentWillMount() {
    const pollId = this.props.pollData.id;
    this.props.fetchPollResults(pollId);
  }

  render() {
    const pollData = this.props.pollData;
    return (
      <View>
        <Text>{pollData.title}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(
  mapStateToProps,
  { fetchPollResults }
)(PollResults);
