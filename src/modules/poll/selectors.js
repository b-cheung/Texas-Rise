import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getPolls = state => state.poll.polls;

export const getFirstPollTimestamp = createSelector(
  getPolls,
  polls => polls[0].timestamp
);
