import * as fbAPI from './../../core/firebase/fbAPI';
import * as types from './actionTypes';

export const clearForm = () => {
  return {
    type: types.CLEAR_FORM
  };
};

export const inputUpdate = ({ prop, value }) => {
  return {
    type: types.INPUT_CHANGED,
    payload: { prop, value }
  };
};

export const login = (data) => {
  const { email, password } = data;
  return dispatch => {
    dispatch({ type: types.AUTH_ATTEMPT });
    if (!email || !password) {
      authError(dispatch, 'Must fill in all required fields.');
    } else {
      fbAPI.login(data, (success, user, error) => authCallback(dispatch, success, user, error));
    }
  };
};

export const register = (data) => {
  const { firstName, lastName, gradeLevel, email, password, confirmPassword } = data;
  return dispatch => {
    dispatch({ type: types.AUTH_ATTEMPT });
    if (!firstName || !lastName || !gradeLevel || !email || !password || !confirmPassword) {
      authError(dispatch, 'Must fill in all required fields.');
    } else if (password !== confirmPassword) {
      authError(dispatch, 'Passwords do not match.');
    } else {
      fbAPI.register(data, (success, user, error) => authCallback(dispatch, success, user, error));
    }
  };
};

function authCallback(dispatch, success, user, error) {
  if (success) {
    authSuccess(dispatch, user);
  } else {
    authError(dispatch, error);
  }
}

function authSuccess(dispatch, user) {
  dispatch({
    type: types.AUTH_SUCCESS,
    payload: user
  });
}

function authError(dispatch, error) {
  dispatch({
    type: types.AUTH_ERROR,
    payload: error
  });
}
