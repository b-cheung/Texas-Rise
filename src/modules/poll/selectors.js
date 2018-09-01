import { createSelector } from 'reselect';
import _ from 'lodash';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getPolls = state => state.poll.polls;

export const getPollFeed = createSelector(
  getPolls,
  polls => _.map(polls, (data) => {
    return data;
  })
);
