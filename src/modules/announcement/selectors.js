import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;

export const getAnnouncements = state => state.announcement.announcements;

export const getFirstAnnouncementTimestamp = createSelector(
  getAnnouncements,
  announcements => announcements[0].timestamp
);

export const getLastAnnouncementTimestamp = createSelector(
  getAnnouncements,
  announcements => announcements[announcements.length - 1].timestamp
);
