import _ from 'lodash';
import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getAnnouncements = state => state.announcement.announcements;

// array of announcements [announcementData1, announcementData2, ...]
export const getAnnouncementFeed = createSelector(getAnnouncements, announcements => {
  const announcementFeed = _.map(announcements, data => {
    return data;
  });
  return announcementFeed.sort(compareAnnouncements);
});

export const getFirstAnnouncementTimestamp = createSelector(
  getAnnouncementFeed,
  announcements => announcements[0].timestamp
);

export const getLastAnnouncementTimestamp = createSelector(
  getAnnouncementFeed,
  announcements => announcements[announcements.length - 1].timestamp
);

// sort by timestamp (latest announcements first)
function compareAnnouncements(announcementA, announcementB) {
  const timestampA = announcementA.timestamp;
  const timestampB = announcementB.timestamp;

  let comparison = 0;
  if (timestampA > timestampB) {
    comparison = -1;
  } else if (timestampA < timestampB) {
    comparison = 1;
  }
  return comparison;
}
