import * as types from './actionTypes';

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

export const votePollRequest = data => {
  return {
    type: types.VOTE_POLL_REQUEST,
    data
  };
};

export const fetchPollResultsRequest = data => {
  return {
    type: types.FETCH_POLL_RESULTS_REQUEST,
    data
  };
};
