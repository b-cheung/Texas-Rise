import * as types from './actionTypes';

export const fetchNewPollsRequest = () => {
  return {
    type: types.FETCH_NEW_POLLS_REQUEST
  };
};

export const fetchPollsRequest = () => {
  return {
    type: types.FETCH_POLLS_REQUEST,
  };
};

export const createPollRequest = data => {
  return {
    type: types.CREATE_POLL_REQUEST,
    data
  };
};
