import {
  all,
  call,
  take,
  fork,
  cancel,
  put,
  cancelled,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import * as fbAPI from './../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as types from './actionTypes';

function* fetchAnnouncementsFlow(action) {
  try {
    // const timestamp = yield call(fbAPI.getTimestamp);
    // console.tron.log('timestamp', timestamp);
    // const data = { ...action.data, timestamp };
    let docs;
    if (action.type === types.FETCH_ANNOUNCEMENTS_REQUEST) {
      docs = yield call(fbAPI.fetchAnnouncements, action.data);
    } else if (action.type === types.FETCH_NEW_ANNOUNCEMENTS_REQUEST) {
      docs = yield call(fbAPI.fetchNewAnnouncements, action.data);
    } else if (action.type === types.FETCH_OLD_ANNOUNCEMENTS_REQUEST) {
      docs = yield call(fbAPI.fetchOldAnnouncements, action.data);
    }
    const announcements = docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    yield put({ type: types.FETCH_ANNOUNCEMENTS_SUCCESS, announcements });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_ANNOUNCEMENTS_FAILURE
    console.tron.log(error);
    yield put({ type: types.FETCH_ANNOUNCEMENTS_FAILURE, announcements: null, error });
  }
}

function* createAnnouncementFlow(action) {
  // data = { email, password }
  try {
    // try to call createAnnouncementDoc() with data
    const doc = yield call(fbAPI.createAnnouncementDoc, action.data);
    const announcement = { id: doc.id, ...doc.data() };
    // when createAnnouncementDoc completes
    // dispatch action of type CREATE_ANNOUNCEMENT_SUCCESS with announcement
    yield put({ type: types.CREATE_ANNOUNCEMENT_SUCCESS, announcement });
    // watch for action to dispatch first? take(types.CREATE_ANNOUNCEMENT_SUCCESS)
    NavigationService.goBack();
  } catch (error) {
    // if api call fails,
    // dispatch action of type CREATE_ANNOUNCEMENT_FAILURE
    console.tron.log(error);
    yield put({ type: types.CREATE_ANNOUNCEMENT_FAILURE, announcement: null, error });
  }
}

export function* watchAnnouncements() {
  yield all([
    takeLatest(
      [
        types.FETCH_ANNOUNCEMENTS_REQUEST,
        types.FETCH_NEW_ANNOUNCEMENTS_REQUEST,
        types.FETCH_OLD_ANNOUNCEMENTS_REQUEST
      ],
      fetchAnnouncementsFlow
    ),
    takeLatest(types.CREATE_ANNOUNCEMENT_REQUEST, createAnnouncementFlow)
  ]);
}

// export const sagas = [takeEvery('BAR_A', watchAnnouncements)];
