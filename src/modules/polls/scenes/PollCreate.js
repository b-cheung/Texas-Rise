import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createPollRequest } from '../actions';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, minLength, schoolEmail, emailFormat } from '../../form/FormValidation';
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
  startDateTime: {
    type: 'DateTimePicker',
    label: 'Start ',
    minuteInterval: 15,
    validate: [required]
  },
  endDateTime: {
    type: 'DateTimePicker',
    label: 'End',
    minuteInterval: 15,
    validate: [required]
  }
};

class PollCreate extends Component {
  static navigationOptions = {
    title: 'Create Poll'
  };

  onSubmit = values => {
    const { title, startDateTime, endDateTime } = values;
    console.tron.log('PollCreate submit', startDateTime, endDateTime);
    this.props.createPollRequest({ title, startDateTime, endDateTime });
  };

  getCurrentDateTime = () => {
    const nearest15Min = Math.ceil(moment().minute() / 15) * 15;
    return moment().minute(nearest15Min).second(0);
  }

  render() {
    const currentDateTime = this.getCurrentDateTime();
    const initialVaules = {
      initialValues: {
        startDateTime: currentDateTime,
        endDateTime: currentDateTime
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
