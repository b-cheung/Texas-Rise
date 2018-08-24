import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

function* createPollFlow(action) {
  try {
    const data = { ...action.data };

    const doc = yield call(fbAPI.createPollDoc, data);
    /*
    const fetchAnnouncement = { id: doc.id, ...doc.data() };

    // append fetched announcements to existing announcements
    const announcements = yield call(appendFetchedAnnouncements, fetchAnnouncement);
    */
    // dispatch action of type CREATE_POLL_SUCCESS with announcement
    yield put({ type: types.CREATE_POLL_SUCCESS });
    // watch for action to dispatch first? take(types.CREATE_POLL_SUCCESS)
    NavigationService.goBack();
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type CREATE_POLL_FAILURE
    yield put({ type: types.CREATE_POLL_FAILURE, submitError });
  }
}

export function* watchPolls() {
  yield all([
    takeLatest(types.CREATE_POLL_REQUEST, createPollFlow)
  ]);
}

