import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { votePollRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from './../../form/ReduxForm';
import { required } from '../../form/FormValidation';
import * as pollConfigs from '../pollConfigs';
import { TextField, CustomPicker, ViewContainer } from '../../../components';

class PollVote extends Component {
  onSubmit = values => {
    const pollId = this.props.pollData.pollId;
    const { itemId, spec } = values;
    this.props.votePollRequest({
      pollId,
      itemId,
      itemName: pollConfigs.classes[itemId],
      spec
    });
  };

  render() {
    const { title, author, timestamp, pollType, pollItems } = this.props.pollData;
    const initialVaules = {
      initialValues: {
        itemId: Object.keys(pollItems)[0],
        spec: ''
      }
    };
    return (
      <ViewContainer>
        <Text>{title}</Text>
        <Text>{author.firstName}</Text>
        <Text>{moment.unix(timestamp.seconds).fromNow()}</Text>
        <Text>{pollConfigs.pollTypes[pollType]}</Text>
        <ReduxForm
          onSubmit={this.onSubmit}
          submitName={'Submit'}
          status={this.props.formStatus}
          {...initialVaules}
        >
          <CustomPicker name="itemID" label="Class" items={pollItems} />
          <TextField
            name="spec"
            placeholder="Please specify."
            autoCapitalize="sentences"
            autoCorrect
            validate={[required]}
          />
        </ReduxForm>
      </ViewContainer>
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
