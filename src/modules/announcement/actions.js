import * as types from './actionTypes';

export const fetchNewAnnouncementsRequest = () => {
  return {
    type: types.FETCH_NEW_ANNOUNCEMENTS_REQUEST
  };
};

export const fetchOldAnnouncementsRequest = () => {
  return {
    type: types.FETCH_OLD_ANNOUNCEMENTS_REQUEST,
  };
};

export const fetchAnnouncementsRequest = () => {
  return {
    type: types.FETCH_ANNOUNCEMENTS_REQUEST,
  };
};

export const createAnnouncementRequest = data => {
  return {
    type: types.CREATE_ANNOUNCEMENT_REQUEST,
    data
  };
};
