import firebase from 'firebase';
import NavigationService from '../navigators/NavigationService';
import { FIREBASE_CONFIG } from '../../FirebaseConfig';
import {
  INITIALIZE_FIREBASE,
  CLEAR_FORM,
  INPUT_CHANGED,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT
} from './types';

export const initializeFirebase = () => {
  return dispatch => {
    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    firebase.auth().onAuthStateChanged(user => {
      NavigationService.navigate(user ? 'App' : 'Auth');
    });
    dispatch({
      type: INITIALIZE_FIREBASE,
    });
  };
};

export const clearForm = () => {
  return {
    type: CLEAR_FORM
  };
};

export const inputUpdate = ({ prop, value }) => {
  return {
    type: INPUT_CHANGED,
    payload: { prop, value }
  };
};

export const login = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_ATTEMPT });
    if (!email || !password) {
      loginFailed(dispatch, { error: 'Must fill in all required fields.' });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => loginSuccess(dispatch, user))
        .catch(() => loginFailed(dispatch, { error: 'Authentication failed.' }));
    }
  };
};

export const register = ({ firstName, lastName, gradeLevel, email, password, confirmPassword }) => {
  return dispatch => {
    dispatch({ type: REGISTER_ATTEMPT });
    if (!firstName || !lastName || !gradeLevel || !email || !password || !confirmPassword) {
      registerFailed(dispatch, { error: 'Must fill in all required fields.' });
    } else if (password !== confirmPassword) {
      registerFailed(dispatch, { error: 'Passwords do not match.' });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => registerSuccess(dispatch, user))
        .catch(() => registerFailed(dispatch, { error: 'Registration failed.' }));
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: LOGOUT });
    firebase.auth().signOut();
  };
};

const loginSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
};

const loginFailed = (dispatch, error) => {
  dispatch({
    type: LOGIN_FAILED,
    payload: error
  });
};

const registerSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: user
  });
};

const registerFailed = (dispatch, error) => {
  dispatch({
    type: REGISTER_FAILED,
    payload: error
  });
};
