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
      let announcements;
      if (state.announcements) {
        announcements = action.announcements.concat(state.announcements);
      } else {
        announcements = action.announcements;
      }
      announcements.sort(compare);
      return { ...state, announcements, loading: false };
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
    case types.CREATE_ANNOUNCEMENT_SUCCESS: {
      let announcements;
      if (state.announcements) {
        announcements = [action.announcement].concat(state.announcements);
      } else {
        announcements = [action.announcement];
      }
      announcements.sort(compare);
      return {
        ...state,
        announcements,
        loading: false
      };
    }
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

function compare(announcementA, announcementB) {
  const timestampA = announcementA.timestamp;
  const timestampB = announcementB.timestamp;

  let comparison = 0;
  if (timestampA > timestampB) {
    comparison = -1;
  } else if (timestampA < timestampB) {
    comparison = 1;
  }
  return comparison;
}

