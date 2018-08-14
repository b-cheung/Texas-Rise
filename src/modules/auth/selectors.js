import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getLoading = state => state.auth.loading;
