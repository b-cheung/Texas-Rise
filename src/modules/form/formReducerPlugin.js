import * as types from './actionTypes';
import * as authTypes from '../../modules/auth/actionTypes';
import * as announcementTypes from '../../modules/announcement/actionTypes';

const FORM_INITIAL_STATE = {
  submitError: '',
  loading: ''
};
export const formReducerPlugin = {
  reduxForm: (state = FORM_INITIAL_STATE, action) => {
    switch (action.type) {
      case authTypes.REGISTER_REQUEST:
        return { ...state, submitError: '', loading: true };
      case authTypes.REGISTER_FAILURE:
        return {
          ...state,
          submitError: `code: ${action.submitError.code}\nmessage: ${action.submitError.message}`,
          loading: false
        };
      case authTypes.LOGIN_REQUEST:
        return { ...state, submitError: '', loading: true };
      case authTypes.LOGIN_FAILURE:
        return {
          ...state,
          submitError: `code: ${action.submitError.code}\nmessage: ${action.submitError.message}`,
          loading: false
        };

      case announcementTypes.CREATE_ANNOUNCEMENT_REQUEST:
        return {
          ...state,
          submitError: '',
          loading: true
        };
      case announcementTypes.CREATE_ANNOUNCEMENT_SUCCESS:
        return { ...state, submitError: '', loading: false };
      case announcementTypes.CREATE_ANNOUNCEMENT_FAILURE:
        return {
          ...state,
          submitError: `code: ${action.submitError.code}\nmessage: ${action.submitError.message}`,
          loading: false
        };
      default:
        return state;
    }
  }
};
