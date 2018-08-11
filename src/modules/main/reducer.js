import * as types from './actionTypes';

const INITIAL_STATE = {
  announcements: null,
  error: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_ANNOUNCEMENTS_SUCCESS: {
      return { ...state, announcements: action.announcements, loading: false };
    }
    case types.FETCH_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };

    case types.CREATE_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CREATE_ANNOUNCEMENT_SUCCESS:
      return { ...state, announcements: action.announcements, loading: false };
    case types.CREATE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };
    default:
      return state;
  }
};
