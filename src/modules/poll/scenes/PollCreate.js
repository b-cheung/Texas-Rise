import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createPollRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
import * as pollConfigs from '../pollConfigs';
import {
  ViewContainer,
  TextField,
  TextArea,
  DateTimePicker,
  CustomPicker
} from '../../../components';
import styles from '../styles';
import theme from '../../../styles/theme';

class PollCreate extends Component {
  static navigationOptions = {
    title: 'Create Poll'
  };

  onSubmit = values => {
    const { title, description, dateTimeStart, dateTimeEnd, pollType } = values;
    console.tron.log('PollCreate submit', dateTimeStart, dateTimeEnd);
    const pollItems = pollConfigs[pollType];
    this.props.createPollRequest({
			title,
			description,
      dateTimeStart: moment(dateTimeStart)
        .utc()
        .format(),
      dateTimeEnd: moment(dateTimeEnd)
        .utc()
        .format(),
      pollType,
      pollItems
    });
  };

  getCurrentDateTime = () => {
    const nearest15Min = Math.ceil(moment().minute() / 15) * 15;
    return moment()
      .minute(nearest15Min)
      .second(0)
      .utc()
      .format();
  };

  render() {
    const currentDateTime = this.getCurrentDateTime();
    const initialVaules = {
      initialValues: {
        description: '',
        dateTimeStart: currentDateTime,
        dateTimeEnd: currentDateTime,
        pollType: Object.keys(pollConfigs.pollTypes)[0]
      }
    };
    return (
      <ViewContainer>
        <ReduxForm
          onSubmit={this.onSubmit}
          title={{ label: 'Create Poll' }}
          submitName={'Create Poll'}
          status={this.props.formStatus}
          {...initialVaules}
        >
          <TextField
            name="title"
            placeholder="Title"
            autoCapitalize="words"
            autoCorrect
            validate={[required]}
          />
          <TextArea
            name="description"
            placeholder="Description (optional)"
            autoCapitalize="sentences"
            autoCorrect
          />
          <CustomPicker name="pollType" label="Poll Type" items={pollConfigs.pollTypes} />
          <DateTimePicker name="dateTimeStart" label="Start" minuteInterval={15} />
          <DateTimePicker name="dateTimeEnd" label="End" minuteInterval={15} />
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
  { createPollRequest }
)(PollCreate);
