import { all, call, put, select, takeLatest, take } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as selectors from './selectors';
import * as types from './actionTypes';
import * as pollConfigs from './pollConfigs';

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

// fetchedPolls = []
function* appendFetchedPolls(fetchedPolls) {
  // retrieve existing polls from state tree and append fetched polls
  let polls = yield select(selectors.getPolls);
  // if polls is not undefined/null
  if (polls != null) {
    // append fetched polls to existing polls
    polls = polls.concat(fetchedPolls);
  } else {
    polls = fetchedPolls;
  }
  polls.sort(comparePolls);
  return polls;
}

function* fetchPollsFlow(action) {
  try {
    // create data parameter with appropriate values
    const data = {};
    // determine fetch action and retrieve docs
    const docs = yield call(fbAPI.fetchPolls);
    // create new array of restructured poll objects
    const polls = docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

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
    //poll config here or in poll create?
    //custom poll?
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };

    const doc = yield call(fbAPI.createPollDoc, data);

    const fetchedPoll = { id: doc.id, ...doc.data() };

    // append fetched polls to existing polls
    const polls = yield call(appendFetchedPolls, [fetchedPoll]);

    // dispatch action of type CREATE_POLL_SUCCESS with poll
    yield put({ type: types.CREATE_POLL_SUCCESS, polls });
    NavigationService.goBack();
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type CREATE_POLL_FAILURE
    yield put({ type: types.CREATE_POLL_FAILURE, polls: null, submitError });
  }
}

function* votePollFlow(action) {
  try {
    const user = yield select(selectors.getUser);
    const data = { ...action.data, user };

    yield call(fbAPI.votePoll, data);

    // fetch poll results and re-render
    // use redux to update voter status
    // display poll results

    // dispatch action of type VOTE_POLL_SUCCESS with pollResults
    // yield put({ type: types.VOTE_POLL_SUCCESS, pollResults });
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type VOTE_POLL_FAILURE
    yield put({ type: types.VOTE_POLL_FAILURE, pollResults: null, submitError });
  }
}

function* fetchPollResultsFlow(action) {
  try {
    // determine fetch action and retrieve docs
    const docs = yield call(fbAPI.fetchPollResults, action.data);
    // create new array of restructured pollItem objects
    const pollResults = docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    // dispatch action of type FETCH_POLL_RESULTS_SUCCESS with fetched pollResults
    yield put({ type: types.FETCH_POLL_RESULTS_SUCCESS, pollResults });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_POLL_RESULTS_FAILURE
    console.tron.log(error);
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
