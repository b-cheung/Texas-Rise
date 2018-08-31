import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

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

function* appendFetchedAnnouncements(fetchedAnnouncements) {
  // retrieve existing announcements from state tree and append fetched announcements
  let announcements = yield select(selectors.getAnnouncements);
  if (announcements) {
    announcements = announcements.concat(fetchedAnnouncements);
  } else {
    announcements = fetchedAnnouncements;
  }
  announcements.sort(compareAnnouncements);

  return announcements;
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
    // determine fetch action and retrieve docs
    let docs;
    if (action.type === types.FETCH_ANNOUNCEMENTS_REQUEST) {
      docs = yield call(fbAPI.fetchAnnouncements, data);
    } else if (action.type === types.FETCH_NEW_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getFirstAnnouncementTimestamp);
      data = { ...data, timestamp };
      docs = yield call(fbAPI.fetchNewAnnouncements, data);
    } else if (action.type === types.FETCH_OLD_ANNOUNCEMENTS_REQUEST) {
      const timestamp = yield select(selectors.getLastAnnouncementTimestamp);
      data = { ...data, timestamp };
      docs = yield call(fbAPI.fetchOldAnnouncements, data);
    }
    // create new array of restructured announcement objects
    const fetchedAnnouncements = docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    // append fetched announcements to existing announcements
    const announcements = yield call(appendFetchedAnnouncements, fetchedAnnouncements);

    // dispatch action of type FETCH_ANNOUNCEMENTS_SUCCESS with fetched announcements
    yield put({ type: types.FETCH_ANNOUNCEMENTS_SUCCESS, announcements });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_ANNOUNCEMENTS_FAILURE
    console.tron.log(error);
    yield put({ type: types.FETCH_ANNOUNCEMENTS_FAILURE, announcements: null, error });
  }
}

function* createAnnouncementFlow(action) {
  try {
    if (!action.data.member && !action.data.student) {
      throw new Error('Must select at least one audience');
    }
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };
    // call createAnnouncementDoc() with data
    const doc = yield call(fbAPI.createAnnouncementDoc, data);
    const fetchedAnnouncement = { id: doc.id, ...doc.data() };

    // append fetched announcements to existing announcements
    const announcements = yield call(appendFetchedAnnouncements, [fetchedAnnouncement]);

    // dispatch action of type CREATE_ANNOUNCEMENT_SUCCESS with announcement
    yield put({ type: types.CREATE_ANNOUNCEMENT_SUCCESS, announcements });
    // watch for action to dispatch first? take(types.CREATE_ANNOUNCEMENT_SUCCESS)
    NavigationService.goBack();
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type CREATE_ANNOUNCEMENT_FAILURE
    console.tron.log(submitError);
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

