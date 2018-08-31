import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { votePollRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from './../../form/ReduxForm';
import { required } from '../../form/FormValidation';
import * as pollConfigs from '../pollConfigs';

class PollVote extends Component {
  onSubmit = values => {
    const pollId = this.props.pollData.id;
    const { itemId, spec } = values;
    this.props.votePollRequest({
      pollId,
      itemId,
      itemName: pollConfigs.classes[itemId],
      spec
    });
  };

  render() {
    const pollData = this.props.pollData;
    const FIELDS = {
      itemId: {
        type: 'Picker',
        label: 'Class',
        items: pollData.pollItems,
        validate: [required]
      },
      spec: {
        type: 'TextField',
        label: 'Topic',
        validate: [required]
      }
    };
    const { title, author, timestamp, pollType } = pollData;
    const initialVaules = {
      initialValues: {
        itemId: Object.keys(pollData.pollItems)[0],
        spec: ''
      }
    };
    return (
      <View style={{ flex: 1 }}>
        <Text>{title}</Text>
        <Text>{author.firstName}</Text>
        <Text>{moment.unix(timestamp.seconds).fromNow()}</Text>
        <Text>{pollConfigs.pollTypes[pollType]}</Text>
        <ReduxForm
          onSubmit={this.onSubmit}
          fields={FIELDS}
          submitName={'Submit'}
          status={this.props.formStatus}
          {...initialVaules}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    formStatus: getFormStatus(state)
  };
};

export default connect(
  mapStateToProps,
  { votePollRequest }
)(PollVote);
