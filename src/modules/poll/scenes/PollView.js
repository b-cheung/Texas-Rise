import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUser } from '../selectors';
import PollVote from './PollVote';
import PollResults from './PollResults';

class PollView extends Component {
  state = { pollData: this.props.navigation.getParam('data', null) };

  render() {
    const pollData = this.state.pollData;
    const user = this.props.user;
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

const mapStateToProps = state => {
  return {
    user: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PollView);
