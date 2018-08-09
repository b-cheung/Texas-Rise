import * as types from './actionTypes';


export const fetchNewAnnouncementsRequest = data => {
  return {
    type: types.FETCH_NEW_ANNOUNCEMENTS_REQUEST,
    data
  };
};

export const fetchOldAnnouncementsRequest = data => {
  return {
    type: types.FETCH_OLD_ANNOUNCEMENTS_REQUEST,
    data
  };
};

export const fetchAnnouncementsRequest = data => {
  return {
    type: types.FETCH_ANNOUNCEMENTS_REQUEST,
    data
  };
};

export const createAnnouncementRequest = data => {
  return {
    type: types.CREATE_ANNOUNCEMENT_REQUEST,
    data
  };
};
