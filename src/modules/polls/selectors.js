import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getUserRole = state => state.auth.user.role;
