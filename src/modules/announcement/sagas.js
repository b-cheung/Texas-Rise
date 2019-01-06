import _ from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

function* appendFetchedAnnouncements(fetchedAnnouncements) {
  // append fetched announcements to existing announcements
  const announcements = yield select(selectors.getAnnouncements);
  return { ...announcements, ...fetchedAnnouncements };
}

function* fetchAnnouncementsFlow(action) {
  try {
    // check authorization
    // getUserRole gets token everytime?
    // const userRole = yield call(fbAPI.getUserRole);
    const userRole = yield select(selectors.getUserRole);
    const num = 5;
    // create data parameter with appropriate values
    let data = { userRole, num };
    // determine fetch action and retrieve announcementDocs
    let announcementDocs;
    if (action.type === types.FETCH_ANNOUNCEMENTS_REQUEST) {
      announcementDocs = yield call(fbAPI.fetchAnnouncements, data);
    } else if (action.type === types.FETCH_NEW_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getFirstAnnouncementTimestamp);
      data = { ...data, timestamp };
      announcementDocs = yield call(fbAPI.fetchNewAnnouncements, data);
    } else if (action.type === types.FETCH_OLD_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getLastAnnouncementTimestamp);
      data = { ...data, timestamp };
      announcementDocs = yield call(fbAPI.fetchOldAnnouncements, data);
    }

    // create new object { announcementId: data, ... }
    const fetchedAnnouncements = _.keyBy(
      announcementDocs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }),
      'id'
    );

    // append fetched announcements to existing announcements
    const announcements = yield call(appendFetchedAnnouncements, fetchedAnnouncements);

    // dispatch action of type FETCH_ANNOUNCEMENTS_SUCCESS with fetched announcements
    yield put({ type: types.FETCH_ANNOUNCEMENTS_SUCCESS, announcements });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_ANNOUNCEMENTS_FAILURE
    yield put({ type: types.FETCH_ANNOUNCEMENTS_FAILURE, announcements: null, error });
  }
}

function* createAnnouncementFlow(action) {
  try {
    if (!action.data.audience.member && !action.data.audience.student) {
      throw new Error('Must select at least one audience.');
    }
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };
    // call createAnnouncementDoc() with data
    const announcementDoc = yield call(fbAPI.createAnnouncementDoc, data);

    const fetchedAnnouncement = {
      [announcementDoc.id]: {
        id: announcementDoc.id,
        ...announcementDoc.data()
      }
    };

    const announcements = yield call(appendFetchedAnnouncements, fetchedAnnouncement);

    // dispatch action of type CREATE_ANNOUNCEMENT_SUCCESS with announcement
    yield put({ type: types.CREATE_ANNOUNCEMENT_SUCCESS, announcements });
    // watch for action to dispatch first? take(types.CREATE_ANNOUNCEMENT_SUCCESS)
    NavigationService.goBack();
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type CREATE_ANNOUNCEMENT_FAILURE
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
