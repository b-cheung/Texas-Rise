import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchPollResultsRequest } from '../actions';
import { getUser, getPollData, getPollResults } from '../selectors';
import { ViewContainer } from '../../../components';

class PollResults extends Component {
  componentWillMount() {
    const pollId = this.props.pollId;
    this.props.fetchPollResultsRequest(pollId);
  }

  renderPollResults() {
    if (this.props.pollResults) {
      return Object.values(this.props.pollResults).map(item => {
        return <Text key={item.id}>{`${item.itemName}: ${item.votes}`}</Text>;
      });
    }
  }

  render() {
    const { pollData, pollResults } = this.props;
    console.tron.log('PollResults render', pollResults);
    return (
      <ViewContainer>
        <Text>{pollData.title}</Text>
        {this.renderPollResults()}
      </ViewContainer>
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
