import { createSelector } from 'reselect';

export const getError = state => state.auth.error;
export const getLoading = state => state.auth.loading;
