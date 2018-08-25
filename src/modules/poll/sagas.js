import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';

function comparePolls(pollA, pollB) {
  const timestampA = pollA.timestamp;
  const timestampB = pollB.timestamp;

  let comparison = 0;
  if (timestampA > timestampB) {
    comparison = -1;
  } else if (timestampA < timestampB) {
    comparison = 1;
  }
  return comparison;
}

function* appendFetchedPolls(fetchedPolls) {
  // retrieve existing polls from state tree and append fetched polls
  let polls = yield select(selectors.getPolls);
  if (polls) {
    polls = polls.concat(fetchedPolls);
  } else {
    polls = fetchedPolls;
  }
  polls.sort(comparePolls);

  return polls;
}

function* fetchPollsFlow(action) {
  try {
    const num = 5;
    // create data parameter with appropriate values
    let data = { num };
    // determine fetch action and retrieve docs
    let docs;
    if (action.type === types.FETCH_POLLS_REQUEST) {
      docs = yield call(fbAPI.fetchPolls, data);
    } else if (action.type === types.FETCH_NEW_POLLS_REQUEST) {
      const timestamp = yield select(selectors.getFirstPollTimestamp);
      data = { ...data, timestamp };
      docs = yield call(fbAPI.fetchNewPolls, data);
    }
    // create new array of restructured poll objects
    const fetchedPolls = docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    // append fetched polls to existing polls
    const polls = yield call(appendFetchedPolls, fetchedPolls);

    // dispatch action of type FETCH_POLLS_SUCCESS with fetched polls
    yield put({ type: types.FETCH_POLLS_SUCCESS, polls });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_POLLS_FAILURE
    console.tron.log(error);
    yield put({ type: types.FETCH_POLLS_FAILURE, polls: null, error });
  }
}

function* createPollFlow(action) {
  try {
    const data = { ...action.data };

    const doc = yield call(fbAPI.createPollDoc, data);
    /*
    const fetchPoll = { id: doc.id, ...doc.data() };

    // append fetched polls to existing polls
    const polls = yield call(appendFetchedPolls, fetchPoll);
    */
    // dispatch action of type CREATE_POLL_SUCCESS with poll
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
    takeLatest(
      [
        types.FETCH_POLLS_REQUEST,
        types.FETCH_NEW_POLLS_REQUEST
      ],
      fetchPollsFlow
    ),
    takeLatest(types.CREATE_POLL_REQUEST, createPollFlow)
  ]);
}

