import _ from 'lodash';
import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getPollData = (state, pollId) => state.poll.polls[pollId];

export const getPolls = state => state.poll.polls;

export const getPollResults = state => state.poll.pollResults;

// array of polls [pollDoc1, pollDoc2, ...]
export const getPollFeed = createSelector(getPolls, polls => {
  const pollFeed = _.map(polls, data => {
    return data;
  });
  return pollFeed.sort(comparePolls);
});

// sort by timestamp (latest polls first)
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
