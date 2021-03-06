import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAnnouncementRequest } from '../actions';
import { getUser } from '../selectors';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required } from '../../form/FormValidation';
import ImageLoader from '../../auth/ImageLoader';
import theme from '../../../styles/theme';

const FIELDS = {
  title: {
    type: 'TextField',
    label: 'Title',
    secureTextEntry: false,
    autoCapitalize: 'words',
    validate: [required]
  },
  body: {
    type: 'TextField',
    label: 'Message',
    multiline: true,
    secureTextEntry: false,
    autoCapitalize: 'sentences',
    validate: [required]
  },
  audience: {
    type: 'Select',
    label: 'Audience',
    fields: {
      member: {
        type: 'Selectable',
        label: 'Members',
      },
      student: {
        type: 'Selectable',
        label: 'Students',
      }
    }
  }
};

class AnnouncementCreate extends Component {
  static navigationOptions = {
    title: 'Create Announcement'
  };

  onSubmit = values => {
    const { title, body, member, student } = values;
    this.props.createAnnouncementRequest({
      title,
      body,
      member,
      student
    });
  };

  render() {
    const initialVaules = {
      initialValues: {
        member: false,
        student: false
      }
    };
    return (
      <ReduxForm
        onSubmit={this.onSubmit}
        // title={{ label: 'Create Announcement' }}
        style={{ flex: 1, marginTop: 20 }}
        fields={FIELDS}
        submitName={'Post'}
        status={this.props.formStatus}
        {...initialVaules}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUser(state),
    formStatus: getFormStatus(state)
  };
};

export default connect(
  mapStateToProps,
  { createAnnouncementRequest }
)(AnnouncementCreate);
