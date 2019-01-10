import _ from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

function* fetchAnnouncementsFlow(action) {
  try {
    // get user role and create request
    const userRole = yield select(selectors.getUserRole);
    const numAnnouncements = 5;
		let request = { userRole, numAnnouncements };
		
    // determine fetch request and retrieve announcementDocs
    let announcementDocs;
    if (action.type === types.FETCH_ANNOUNCEMENTS_REQUEST) {
      announcementDocs = yield call(fbAPI.fetchAnnouncements, request);
    } else if (action.type === types.FETCH_NEW_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getFirstAnnouncementTimestamp);
      request = { ...request, timestamp };
      announcementDocs = yield call(fbAPI.fetchNewAnnouncements, request);
    } else if (action.type === types.FETCH_OLD_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getLastAnnouncementTimestamp);
      request = { ...request, timestamp };
      announcementDocs = yield call(fbAPI.fetchOldAnnouncements, request);
    }

    // { announcementId: data, ... }
    const fetchedAnnouncements = _.keyBy(
      announcementDocs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }),
      'id'
    );

    // append fetched announcements to existing announcements
    const announcements = yield call(appendFetchedAnnouncements, fetchedAnnouncements);

    yield put({ type: types.FETCH_ANNOUNCEMENTS_SUCCESS, announcements });
  } catch (error) {
    yield put({ type: types.FETCH_ANNOUNCEMENTS_FAILURE, announcements: null, error });
  }
}

function* appendFetchedAnnouncements(fetchedAnnouncements) {
  // append fetched announcements to existing announcements
  const announcements = yield select(selectors.getAnnouncements);
  return { ...announcements, ...fetchedAnnouncements };
}

function* createAnnouncementFlow(action) {
  try {
    if (!action.data.audience.member && !action.data.audience.student) {
      throw new Error('Must select at least one audience.');
		}
		// create announcement document
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };
    const announcementDoc = yield call(fbAPI.createAnnouncementDoc, data);

		// { announcementId: data, ... }
    const fetchedAnnouncement = {
      [announcementDoc.id]: {
        id: announcementDoc.id,
        ...announcementDoc.data()
      }
    };

    const announcements = yield call(appendFetchedAnnouncements, fetchedAnnouncement);

    yield put({ type: types.CREATE_ANNOUNCEMENT_SUCCESS, announcements });
    // watch for action to dispatch first? take(types.CREATE_ANNOUNCEMENT_SUCCESS)
    NavigationService.goBack();
  } catch (submitError) {
    yield put({ type: types.CREATE_ANNOUNCEMENT_FAILURE, announcement: null, submitError });
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
