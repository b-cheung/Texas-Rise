import * as fbAPI from './../../core/firebase/fbAPI';
import * as types from './actionTypes';
import NavigationService from '../../core/navigation/NavigationService';

export const fetchAnnouncements = num => {
  console.tron.log('fetchAnnouncements');
  return dispatch => {
    fbAPI.fetchAnnouncements(num, (success, data, error) => {
      if (success) {
        console.tron.log('fetchAnnouncements data:', data);
        dispatch({
          type: types.FETCH_ANNOUNCEMENTS,
          payload: data
        });
      } else {
        dispatch({
          type: types.FETCH_ANNOUNCEMENTS_FAILURE,
          payload: error
        });
      }
    });
  };
};

export const clearForm = () => {
  return {
    type: types.CLEAR_FORM
  };
};

export const inputUpdate = ({ prop, value }) => {
  return {
    type: types.INPUT_CHANGED,
    payload: { prop, value }
  };
};

export const toggleSelectable = ({ prop, value }) => {
  const toggledValue = !value;
  console.tron.log('toggleSelectable:', value, toggledValue);
  return {
    type: types.TOGGLE_SELECTABLE,
    payload: { prop, toggledValue }
  };
};

export const createAnnouncement = data => {
  console.tron.log('createAnnouncement');
  return dispatch => {
    fbAPI.createAnnouncementDoc(data, (success, announcement, error) => {
      if (success) {
        dispatch({
          type: types.CREATE_ANNOUNCEMENT,
          payload: announcement
        });
        NavigationService.goBack();
      } else {
        dispatch({
          type: types.CREATE_ANNOUNCEMENT_FAILURE,
          payload: error
        });
      }
    });
  };
};
