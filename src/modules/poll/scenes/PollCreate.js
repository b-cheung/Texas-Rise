import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createPollRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
import * as pollConfigs from '../pollConfigs';
import styles from '../styles';
import theme from '../../../styles/theme';

const FIELDS = {
  title: {
    type: 'TextField',
    label: 'Title',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  dateTimeStart: {
    type: 'DateTimePicker',
    label: 'Start ',
    minuteInterval: 15,
    validate: [required]
  },
  dateTimeEnd: {
    type: 'DateTimePicker',
    label: 'End',
    minuteInterval: 15,
    validate: [required]
  },
  pollType: {
    type: 'Picker',
    label: 'Poll Type',
    items: pollConfigs.pollTypes,
    validate: [required]
  }
};

class PollCreate extends Component {
  static navigationOptions = {
    title: 'Create Poll'
  };

  onSubmit = values => {
    const { title, dateTimeStart, dateTimeEnd, pollType } = values;
    console.tron.log('PollCreate submit', dateTimeStart, dateTimeEnd);
    const pollItems = pollConfigs[pollType];
    this.props.createPollRequest({
      title,
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
        dateTimeStart: currentDateTime,
        dateTimeEnd: currentDateTime,
        pollType: Object.keys(pollConfigs.pollTypes)[0]
      }
    };
    return (
      <ReduxForm
        onSubmit={this.onSubmit}
        fields={FIELDS}
        submitName={'Create'}
        status={this.props.formStatus}
        {...initialVaules}
      />
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
