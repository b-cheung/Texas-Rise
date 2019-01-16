import React, { Component } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { isAdminOrOfficer } from '../../../core/firebase/fbAuth';
import { togglePollState } from '../actions';
import { getPollData, getUser } from '../selectors';
import PollVote from './PollVote';
import PollResults from './PollResults';
import { ViewContainer } from '../../../components';

class PollView extends Component {
  state = {
    pollId: this.props.navigation.getParam('pollId', null)
  };

  togglePollState = () => {
		const { id, active } = this.props.pollData;
		console.tron.log('toggled', active);
		const data = { pollId: id, active: !active };
		console.tron.log('toggled', active);
    this.props.togglePollState(data);
  };

  renderView() {
    const { pollData, user } = this.props;
    if (user) {
      if (isAdminOrOfficer(user)) {
        return (
          <View>
            <Switch onValueChange={this.togglePollState} value={this.props.pollData.active} />
            <PollResults pollId={this.state.pollId} />
          </View>
        );
      }
      if (pollData.voters) {
        for (const voterUid of pollData.voters) {
          // if user voted, display results
          if (user.uid === voterUid) {
            return <PollResults pollId={this.state.pollId} />;
          }
        }
      }
      return <PollVote pollData={this.props.pollData} />;
    }
  }

  render() {
    return (
      <ViewContainer>
        <ScrollView>{this.renderView()}</ScrollView>
      </ViewContainer>
    );
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
  { togglePollState }
)(PollView);
