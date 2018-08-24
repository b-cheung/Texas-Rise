import * as types from './actionTypes';

export const createPollRequest = data => {
  return {
    type: types.CREATE_POLL_REQUEST,
    data
  };
};
