import * as types from './actionTypes';

export const fetchAnnouncementsRequest = data => {
  console.tron.log('fetchAnnouncements');
  return {
    type: types.FETCH_ANNOUNCEMENTS_REQUEST,
    data
  };
};

export const createAnnouncementRequest = data => {
  console.tron.log('createAnnouncementRequest');
  return {
    type: types.CREATE_ANNOUNCEMENT_REQUEST,
    data
  };
};
