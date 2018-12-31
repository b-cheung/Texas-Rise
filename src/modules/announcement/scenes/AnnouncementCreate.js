import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAnnouncementRequest } from '../actions';
import { getUser } from '../selectors';
import { getFormStatus } from '../../form/selectors';
import { ReduxForm } from '../../form/ReduxForm';
import { required, requiredMulti } from '../../form/FormValidation';
import { TextField, TextArea, ViewContainer, MultiSelect } from '../../../components';
import theme from '../../../styles/theme';

const FIELDS = {
  audience: {
    type: 'Select',
    label: 'Audience',
    fields: {
      member: {
        type: 'Selectable',
        label: 'Members'
      },
      student: {
        type: 'Selectable',
        label: 'Students'
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
    return (
      <ViewContainer style={theme.container}>
        <ReduxForm
          onSubmit={this.onSubmit}
          // title={{ label: 'Create Announcement' }}
          submitName={'Post'}
          status={this.props.formStatus}
        >
          <TextField
            name="title"
            placeholder="Title"
            autoCapitalize="words"
            autoCorrect
            validate={[required]}
          />
          <TextArea
            name="body"
            placeholder="Message"
            autoCapitalize="sentences"
            autoCorrect
            validate={[required]}
          />
          <MultiSelect
            name="audience"
            options={['Members', 'Students']}
            validate={[requiredMulti]}
          />
        </ReduxForm>
      </ViewContainer>
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
