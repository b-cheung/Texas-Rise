import { all, call, take, takeLatest, fork, put } from 'redux-saga/effects';
import * as fbAuth from '../../core/firebase/fbAuth';
import * as fbAPI from '../../core/firebase/fbAPI';
import NavigationService from '../../core/navigation/NavigationService';
import * as types from './actionTypes';

// watch for initialization to start
export function* watchInitialization() {
  yield take(types.INITIALIZATION_START);
	// initialize firebase and get authUser
  // const authUser = yield call(fbAuth.initializeFirebase);	
  const authUser = yield call(fbAuth.getAuthUser);
  yield put({ type: types.AUTH_REQUEST, authUser });
}

// watch for authentication requests
export function* watchAuthentication() {
  yield all([
    takeLatest(types.AUTH_REQUEST, authFlow),
    takeLatest([types.REGISTER_REQUEST, types.LOGIN_REQUEST], authHandler),
    takeLatest(types.LOGOUT_REQUEST, logoutFlow)
  ]);
}

function* authFlow(action) {
  // check if user is authenticated
  let authUser = action.authUser;
  if (authUser == null) {
    // not authenticated
    console.tron.log('authUser is null');
    NavigationService.navigate('Auth');
  } else {
    // authenticated
    yield call(fbAuth.setAuthStateListener);
    if (!authUser.emailVerified) {
      // email not verified
      authUser = yield call(verifyEmailFlow);
    }
    // auth success and email verified, fetch user data
    const taskFetch = yield fork(fetchUser, authUser);
    const actionFetch = yield take([types.FETCH_USER_SUCCESS, types.FETCH_USER_FAILURE]);
    if (actionFetch.type === types.FETCH_USER_SUCCESS) {
      NavigationService.navigate('App');
    }
    // handle fetch user error
  }
}

// handle REGISTER_REQUEST or LOGIN_REQUEST
function* authHandler(actionReq) {
  let authUser;
  if (actionReq.type === types.REGISTER_REQUEST) {
    // pass in data and run registerFlow
    authUser = yield call(registerFlow, actionReq.data);
  } else if (actionReq.type === types.LOGIN_REQUEST) {
    // pass in data and run loginFlow
    authUser = yield call(loginFlow, actionReq.data);
  }
  // if login/register successfully returns non-null authUser
  if (authUser) {
    yield put({ type: types.AUTH_REQUEST, authUser });
  }
}

function* registerFlow(data) {
  try {
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    let role;
    if (data.email.indexOf('@utexas.edu') !== -1) {
      role = 'member';
    } else if (data.email.indexOf('@stu.austinisd.org') !== -1) {
      role = 'student';
    } else {
      role = 'guest';
    }
    // try register with data
    const response = yield call(fbAuth.register, data);
    const authUser = response.user;
    // create user doc and send verification email
    yield call(fbAPI.createUserDoc, { ...data, role }, authUser);
    yield call(fbAuth.sendVerificationEmail);
    // yield put({ type: types.REGISTER_SUCCESS, authUser, submitError: null });
    return authUser;
  } catch (submitError) {
    console.tron.log(submitError);
    yield put({ type: types.REGISTER_FAILURE, authUser: null, submitError });
    return null;
  }
}

function* loginFlow(data) {
  try {
    // try login with data
    const response = yield call(fbAuth.login, data);
    const authUser = response.user;
    // yield put({ type: types.LOGIN_SUCCESS, authUser, submitError: null });
    return authUser;
  } catch (submitError) {
    console.tron.log(submitError);
    yield put({ type: types.LOGIN_FAILURE, authUser: null, submitError });
    return null;
  }
}

// handle SEND_VERIFICATION_EMAIL_REQUEST or VERIFICATION_STATUS_REQUEST
function* verifyEmailFlow() {
  NavigationService.navigate('VerifyEmail');
  while (true) {
    try {
      const action = yield take([
        types.SEND_VERIFICATION_EMAIL_REQUEST,
        types.VERIFICATION_STATUS_REQUEST
      ]);
      if (action.type === types.SEND_VERIFICATION_EMAIL_REQUEST) {
        yield call(fbAuth.sendVerificationEmail);
        yield put({ type: types.SEND_VERIFICATION_EMAIL_SUCCESS });
      } else if (action.type === types.VERIFICATION_STATUS_REQUEST) {
        const authUser = yield call(fbAuth.reloadAuthUser);
        if (authUser.emailVerified) {
          return authUser;
        }
        yield put({ type: types.VERIFICATION_STATUS_FAILURE, error: 'Email not verified.' });
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

    const claims = yield call(fbAuth.getUserClaims);
    console.tron.log('fetchUser claims', claims);

    const user = { uid: doc.id, ...doc.data() };
    yield put({ type: types.FETCH_USER_SUCCESS, user });
  } catch (error) {
    console.tron.log(error);
    yield put({ type: types.FETCH_USER_FAILURE, user: null, error });
  }
}

function* logoutFlow() {
  try {
    // try logout()
    yield call(fbAuth.logout);
    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    // if api call fails,
    // dispatch action of type LOGOUT_FAILURE with error
    console.tron.log(error);
    yield put({ type: types.LOGOUT_FAILURE, error });
  }
}
