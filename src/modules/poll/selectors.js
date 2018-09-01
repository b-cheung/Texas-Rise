import { createSelector } from 'reselect';
import _ from 'lodash';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getPolls = state => state.poll.polls;

export const getPollFeed = createSelector(getPolls, polls => {
  const pollFeed = _.map(polls, data => {
    return data;
  });
  return pollFeed.sort(comparePolls);
});

function comparePolls(pollA, pollB) {
  const timestampA = pollA.timestamp;
  const timestampB = pollB.timestamp;

  let comparison = 0;
  if (timestampA > timestampB) {
    comparison = -1;
  } else if (timestampA < timestampB) {
    comparison = 1;
  }
  return comparison;
}
