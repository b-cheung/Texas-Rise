import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../core/firebase/fbAPI';
import NavigationService from '../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

export function* watchAnnouncements() {
  yield all([
    // takeLatest(types.CREATE_ANNOUNCEMENT_REQUEST, createAnnouncementFlow)
  ]);
}

