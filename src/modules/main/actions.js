import * as types from './actionTypes';

export const fetchAnnouncementsRequest = num => {
  console.tron.log('fetchAnnouncements');
    return {
      type: types.FETCH_ANNOUNCEMENTS_REQUEST,
      num
    };
};

export const createAnnouncementRequest = data => {
  console.tron.log('createAnnouncementRequest');
  return {
    type: types.CREATE_ANNOUNCEMENT_REQUEST,
    data
  };
};
