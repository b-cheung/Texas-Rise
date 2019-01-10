import _ from 'lodash';
import { all, call, put, select, takeLatest, take } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';
import * as pollConfigs from './pollConfigs';

function* fetchPollsFlow(action) {
  try {
    // determine fetch action and retrieve pollDocs
		const pollDocs = yield call(fbAPI.fetchPolls);

    // { pollId: data, ... }
    const polls = _.keyBy(
      pollDocs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }),
      'id'
    );

    yield put({ type: types.FETCH_POLLS_SUCCESS, polls });
  } catch (error) {
    yield put({ type: types.FETCH_POLLS_FAILURE, polls: null, error });
  }
}

function* appendFetchedPolls(fetchedPolls) {
  // append fetched polls to existing polls
  const polls = yield select(selectors.getPolls);
  return { ...polls, ...fetchedPolls };
}

function* createPollFlow(action) {
  try {
    //poll config here or in poll create?
		//custom poll?
		//create poll document
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };

    const pollDoc = yield call(fbAPI.createPollDoc, data);

    const fetchedPoll = {
      [pollDoc.id]: {
        id: pollDoc.id,
        ...pollDoc.data()
      }
    };

    const polls = yield call(appendFetchedPolls, fetchedPoll);

    yield put({ type: types.CREATE_POLL_SUCCESS, polls });
    NavigationService.goBack();
  } catch (submitError) {
    yield put({ type: types.CREATE_POLL_FAILURE, polls: null, submitError });
  }
}

function* votePollFlow(action) {
  try {
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };

    yield call(fbAPI.votePoll, data);

    //fetch updated pollDoc
    const pollDoc = yield call(fbAPI.fetchPoll, data.pollId);

    const fetchedPoll = {
      [pollDoc.id]: {
        id: pollDoc.id,
        ...pollDoc.data()
      }
    };

		const polls = yield call(appendFetchedPolls, fetchedPoll);
		
    yield put({ type: types.VOTE_POLL_SUCCESS, polls });
  } catch (submitError) {
    yield put({ type: types.VOTE_POLL_FAILURE, pollResults: null, submitError });
  }
}

function* fetchPollResultsFlow(action) {
  try {
    // determine fetch action and retrieve 
    const pollResultDocs = yield call(fbAPI.fetchPollResults, action.data);
    // create new array of restructured pollItem objects
    const pollResults = _.keyBy(
      pollResultDocs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }),
      'id'
    );

    yield put({ type: types.FETCH_POLL_RESULTS_SUCCESS, pollResults });
  } catch (error) {
    yield put({ type: types.FETCH_POLL_RESULTS_FAILURE, pollResults: null, error });
  }
}

export function* watchPolls() {
  yield all([
    takeLatest(types.FETCH_POLLS_REQUEST, fetchPollsFlow),
    takeLatest(types.CREATE_POLL_REQUEST, createPollFlow),
    takeLatest(types.VOTE_POLL_REQUEST, votePollFlow),
    takeLatest(types.FETCH_POLL_RESULTS_REQUEST, fetchPollResultsFlow)
  ]);
}
