import { takeLatest } from 'redux-saga';
import { call, take, fork, cancel, put, cancelled, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import * as fbAPI from './../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as types from './actionTypes';

function* registerFlow(data) {
  // data = { firstName, lastName, year, email, role, password }
  try {
    // try register() with data
    // wait for register response
    const response = yield call(fbAPI.register, data);
    const authUser = response.user;
    // create user doc
    yield call(fbAPI.createUserDoc, data, authUser);
    // when createUserDoc completes,
    // dispatch action of type REGISTER_SUCCESS with authUser
    yield put({ type: types.REGISTER_SUCCESS, authUser, error: null });
  } catch (error) {
    // if api call fails,
    // dispatch action of type REGISTER_FAILURE null authUser
    console.tron.log(error);
    yield put({ type: types.REGISTER_FAILURE, authUser: null, error });
  } finally {
    // No matter what, if our `forked` `taskRequest` was cancelled
    // we will then just redirect them to auth
    if (yield cancelled()) {
    }
  }
}

function* loginFlow(data) {
  // data = { email, password }
  try {
    // try to call login() with data
    // wait for login response
    const response = yield call(fbAPI.login, data);
    const authUser = response.user;
    // when login completes,
    // dispatch action of type LOGIN_SUCCESS with authUser
    yield put({ type: types.LOGIN_SUCCESS, authUser, error: null });
  } catch (error) {
    // if api call fails,
    // dispatch action of type LOGIN_FAILURE null authUser
    console.tron.log(error);
    yield put({ type: types.LOGIN_FAILURE, authUser: null, error });
  } finally {
    // No matter what, if our `forked` `taskRequest` was cancelled
    // we will then just redirect them to auth
    if (yield cancelled()) {
    }
  }
}

function* authHandler() {
  // watch for REGISTER_REQUEST or LOGIN_REQUEST action
  // set action
  const actionReq = yield take([types.REGISTER_REQUEST, types.LOGIN_REQUEST]);
  let taskReq;
  if (actionReq.type === types.REGISTER_REQUEST) {
    // pass in data and run registerFlow in forked taskReq
    taskReq = yield fork(registerFlow, actionReq.data);
  } else if (actionReq.type === types.LOGIN_REQUEST) {
    // pass in data and run loginFlow in forked taskReq
    taskReq = yield fork(loginFlow, actionReq.data);
  }
  const actionRes = yield take([
    types.LOGOUT_REQUEST,
    types.REGISTER_SUCCESS,
    types.REGISTER_FAILURE,
    types.LOGIN_SUCCESS,
    types.LOGIN_FAILURE
  ]);
  if (actionRes.type === types.LOGOUT_REQUEST) {
    yield cancel(taskReq);
  } else if (actionRes.type === types.REGISTER_FAILURE || actionRes.type === types.LOGIN_FAILURE) {
    yield put({ type: types.AUTH_FAILURE, authUser: null, error: actionRes.error });
  } else if (actionRes.type === types.REGISTER_SUCCESS || actionRes.type === types.LOGIN_SUCCESS) {
    yield put({ type: types.AUTH_SUCCESS, authUser: actionRes.authUser });
    //end
  }
}

function* fetchUser(authUser) {
  try {
    // fetch user doc
    const doc = yield call(fbAPI.fetchUser, authUser);
    const user = { uid: doc.id, ...doc.data() };
    // when fetchUser completes
    // dispatch action of type FETCH_USER_SUCCESS with user data
    yield put({ type: types.FETCH_USER_SUCCESS, user });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_USER_FAILURE null authUser
    console.tron.log(error);
    yield put({ type: types.FETCH_USER_FAILURE, authUser: null });
  }
}

function* logoutFlow() {
  try {
    yield take(types.LOGOUT_REQUEST);
    // try logout()
    yield call(fbAPI.logout);
  } catch (error) {
    // if api call fails,
    // dispatch action of type LOGOUT_FAILURE with error
    console.tron.log(error);
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

export function* initializationFlow() {
  yield take(types.INITIALIZATION_START);
  // initialize firebase and wait for completion
  yield call(fbAPI.initializeFirebase);
  const authUser = yield call(fbAPI.getCurrentUser);
  yield put({ type: types.INITIALIZATION_COMPLETE, authUser });
}

export function* watchAuth() {
  while (true) {
    const action = yield take([
      types.INITIALIZATION_COMPLETE,
      types.AUTH_REQUEST,
      types.AUTH_SUCCESS,
      types.AUTH_FAILURE
    ]);
    if (action.type === types.INITIALIZATION_COMPLETE) {
      NavigationService.navigate('Auth');
    } else if (action.authUser == null) {
      if (action.type === types.AUTH_REQUEST) {
        // make sure navigator ref is set
        NavigationService.navigate('Auth');
      }
      yield fork(authHandler);
    } else {
      // auth success
      // fetch user data
      const taskFetch = yield fork(fetchUser, action.authUser);
      const actionFetch = yield take([types.FETCH_USER_SUCCESS, types.FETCH_USER_FAILURE]);
      if (actionFetch.type === types.FETCH_USER_SUCCESS) {
        yield call(fbAPI.setAuthStateListener);
        NavigationService.navigate('App');
        yield fork(logoutFlow);
      }
    }
  }
}

// export const sagas = [takeEvery('AUTH', watchAuth)];
