import { call, take, fork, put, cancelled } from 'redux-saga/effects';
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
    // yield put({ type: types.REGISTER_SUCCESS, authUser, error: null });
    return authUser;
  } catch (error) {
    // if api call fails,
    // dispatch action of type REGISTER_FAILURE null authUser
    console.tron.log(error);
    yield put({ type: types.REGISTER_FAILURE, authUser: null, error });
    return null;
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
    // yield put({ type: types.LOGIN_SUCCESS, authUser, error: null });
    return authUser;
  } catch (error) {
    // if api call fails,
    // dispatch action of type LOGIN_FAILURE null authUser
    console.tron.log(error);
    yield put({ type: types.LOGIN_FAILURE, authUser: null, error });
    return null;
  }
}

function* authHandler() {
  while (true) {
    // watch for REGISTER_REQUEST or LOGIN_REQUEST action
    // set action
    const actionReq = yield take([types.REGISTER_REQUEST, types.LOGIN_REQUEST]);
    let authUser;
    if (actionReq.type === types.REGISTER_REQUEST) {
      // pass in data and run registerFlow in forked taskReq
      authUser = yield call(registerFlow, actionReq.data);
    } else if (actionReq.type === types.LOGIN_REQUEST) {
      // pass in data and run loginFlow in forked taskReq
      authUser = yield call(loginFlow, actionReq.data);
    }
    if (authUser) {
      return authUser;
    }
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
    // dispatch action of type FETCH_USER_FAILURE null user
    console.tron.log(error);
    yield put({ type: types.FETCH_USER_FAILURE, user: null, error });
  }
}

function* logoutFlow() {
  try {
    yield take(types.LOGOUT_REQUEST);
    // try logout()
    yield call(fbAPI.logout);
    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    // if api call fails,
    // dispatch action of type LOGOUT_FAILURE with error
    console.tron.log(error);
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}

export function* initializationFlow() {
  // yield take(types.INITIALIZATION_START);
  // initialize firebase and wait for completion
  yield call(fbAPI.initializeFirebase);
  const authUser = yield call(fbAPI.getAuthUser);
  yield put({ type: types.INITIALIZATION_COMPLETE, authUser });
}

export function* watchAuth() {
  while (true) {
    const action = yield take([
      types.INITIALIZATION_COMPLETE,
      types.AUTH_REQUEST
      // types.AUTH_SUCCESS,
      // types.AUTH_FAILURE
    ]);
    // check if user is authenticated
    let authUser = action.authUser;
    if (authUser == null) {
      if (action.type === types.AUTH_REQUEST || action.type === types.INITIALIZATION_COMPLETE) {
        // make sure navigator ref is set
        NavigationService.navigate('Auth');
      }
      // handle auth actions
      authUser = yield call(authHandler);
    }
    // auth success
    // fetch user data
    const taskFetch = yield fork(fetchUser, authUser);
    const actionFetch = yield take([types.FETCH_USER_SUCCESS, types.FETCH_USER_FAILURE]);
    if (actionFetch.type === types.FETCH_USER_SUCCESS) {
      yield call(fbAPI.setAuthStateListener);
      NavigationService.navigate('App');
      yield fork(logoutFlow);
    }
  }
}

// export const sagas = [takeEvery('AUTH', watchAuth)];
