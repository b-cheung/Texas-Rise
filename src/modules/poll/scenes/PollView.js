import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUid, getPollData } from '../selectors';
import PollVote from './PollVote';
import PollResults from './PollResults';

class PollView extends Component {
  state = {
    pollId: this.props.navigation.getParam('pollId', null)
  };

  render() {
    const { pollData, uid } = this.props;
    // if voters array and user !== null
    if (pollData.voters) {
      for (const voterUid of pollData.voters) {
        // if user voted, display results
        if (uid === voterUid) {
          return <PollResults pollId={this.state.pollId} />;
        }
      }
    }
    return <PollVote pollData={this.props.pollData} />;
  }
}

const mapStateToProps = (state, props) => {
  const pollId = props.navigation.getParam('pollId', null);
  return {
    uid: getUid(state),
    pollData: getPollData(state, pollId)
  };
};

export default connect(
  mapStateToProps,
  null
)(PollView);
