import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUser, getPollData } from '../selectors';
import PollVote from './PollVote';
import PollResults from './PollResults';

class PollView extends Component {
  state = { pollId: this.props.navigation.getParam('pollId', null) };

  render() {
    const { pollData, user } = this.props;
    // if voters array and user !== null
    if (pollData.voters && user) {
      for (const voterUid of pollData.voters) {
        // if user voted, display results
        if (user.uid === voterUid) {
          return <PollResults pollData={pollData} />;
        }
      }
    }
    return <PollVote pollData={pollData} />;
  }
}

const mapStateToProps = (state, props) => {
  const pollId = props.navigation.getParam('pollId', null);
  return {
    user: getUser(state),
    pollData: getPollData(state, pollId)
  };
};

export default connect(
  mapStateToProps,
  null
)(PollView);
