import { all, call, take, takeLatest, fork, put, cancelled, takeEvery } from 'redux-saga/effects';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as types from './actionTypes';

function* registerFlow(data) {
  try {
    if (data.password !== data.confirmPassword) {
      throw new Error('Password do not match');
    }
    let role;
    if (data.email.indexOf('@utexas.edu') !== -1) {
      role = 'member';
    } else if (data.email.indexOf('@stu.austinisd.org') !== -1) {
      role = 'student';
    } else {
      role = 'guest';
    }
    // try register() with data
    // wait for register response
    const response = yield call(fbAPI.register, data);
    const authUser = response.user;
    // create user doc
    yield call(fbAPI.createUserDoc, { ...data, role }, authUser);
    yield call(fbAPI.sendVerificationEmail);
    // when createUserDoc completes,
    // dispatch action of type REGISTER_SUCCESS with authUser
    // yield put({ type: types.REGISTER_SUCCESS, authUser, submitError: null });
    return authUser;
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type REGISTER_FAILURE null authUser
    console.tron.log(submitError);
    yield put({ type: types.REGISTER_FAILURE, authUser: null, submitError });
    return null;
  }
}

function* loginFlow(data) {
  try {
    // try to call login() with data
    // wait for login response
    const response = yield call(fbAPI.login, data);
    const authUser = response.user;
    // when login completes,
    // dispatch action of type LOGIN_SUCCESS with authUser
    // yield put({ type: types.LOGIN_SUCCESS, authUser, submitError: null });
    return authUser;
  } catch (submitError) {
    // if api call fails,
    // dispatch action of type LOGIN_FAILURE null authUser
    console.tron.log(submitError);
    yield put({ type: types.LOGIN_FAILURE, authUser: null, submitError });
    return null;
  }
}

function* authHandler(actionReq) {
    // watch for REGISTER_REQUEST or LOGIN_REQUEST action
    // set action
    // const actionReq = yield take([types.REGISTER_REQUEST, types.LOGIN_REQUEST]);
    let authUser;
    if (actionReq.type === types.REGISTER_REQUEST) {
      // pass in data and run registerFlow in forked taskReq
      authUser = yield call(registerFlow, actionReq.data);
    } else if (actionReq.type === types.LOGIN_REQUEST) {
      // pass in data and run loginFlow in forked taskReq
      authUser = yield call(loginFlow, actionReq.data);
    }
    if (authUser) {
      yield put({ type: types.AUTH_REQUEST, authUser });
    }
}

function* verifyEmailFlow() {
  NavigationService.navigate('VerifyEmail');
  while (true) {
    try {
      const action = yield take([
        types.SEND_VERIFICATION_EMAIL_REQUEST,
        types.VERIFICATION_STATUS_REQUEST
      ]);
      if (action.type === types.SEND_VERIFICATION_EMAIL_REQUEST) {
        yield call(fbAPI.sendVerificationEmail);
        yield put({ type: types.SEND_VERIFICATION_EMAIL_SUCCESS });
      } else if (action.type === types.VERIFICATION_STATUS_REQUEST) {
        const authUser = yield call(fbAPI.reloadAuthUser);
        if (authUser.emailVerified) {
          return authUser;
        }
        yield put({ type: types.VERIFICATION_STATUS_FAILURE });
      }
    } catch (error) {
      console.tron.log(error);
      yield put({ type: types.VERIFY_EMAIL_FLOW_FAILURE, error });
    }
  }
}

function* fetchUser(authUser) {
  try {
    // fetch user doc
    const doc = yield call(fbAPI.fetchUser, authUser);
    console.tron.log('fetchUser data', doc.data());
    const claims = yield call(fbAPI.getUserClaims);
    console.tron.log('fetchUser claims', claims);
    const user = { uid: doc.id, ...doc.data() };
    yield put({ type: types.FETCH_USER_SUCCESS, user });
  } catch (error) {
    // if api call fails,
    // dispatch action of type FETCH_USER_FAILURE null user
    console.tron.log(error);
    yield put({ type: types.FETCH_USER_FAILURE, user: null, error });
  }
}

function* authFlow(action) {
  // check if user is authenticated
  let authUser = action.authUser;
  if (authUser == null) {
    console.tron.log('authUser is null');
    NavigationService.navigate('Auth');
  } else {
    yield call(fbAPI.setAuthStateListener);
    if (!authUser.emailVerified) {
      authUser = yield call(verifyEmailFlow);
    }
    // auth success and email verified
    // fetch user data
    const taskFetch = yield fork(fetchUser, authUser);
    const actionFetch = yield take([types.FETCH_USER_SUCCESS, types.FETCH_USER_FAILURE]);
    if (actionFetch.type === types.FETCH_USER_SUCCESS) {
      NavigationService.navigate('App');
    }
  }
}

function* logoutFlow() {
  try {
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

export function* watchInitialization() {
  yield take(types.INITIALIZATION_START);
  // initialize firebase and wait for completion
  yield call(fbAPI.initializeFirebase);
  const authUser = yield call(fbAPI.getAuthUser);
  yield put({ type: types.AUTH_REQUEST, authUser });
}

export function* watchAuthentication() {
  yield all([
    takeLatest([types.REGISTER_REQUEST, types.LOGIN_REQUEST], authHandler),
    takeLatest(types.AUTH_REQUEST, authFlow),
    takeLatest(types.LOGOUT_REQUEST, logoutFlow)
  ]);
}
