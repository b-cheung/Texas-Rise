import { auth } from '../../core/firebase/FirebaseConfig';
import * as fbAPI from './../../core/firebase/fbAPI';
import * as types from './actionTypes';
import NavigationService from '../../core/navigation/NavigationService';

let unsubscribe;

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

// callback()
export function checkLoginStatus() {
  return dispatch => {
    const authUser = fbAPI.getCurrentUser();
    console.log('checkLoginStatus', authUser);
    getUser(dispatch, authUser);
  };
}

export const login = data => {
  const { email, password } = data;
  return dispatch => {
    dispatch({ type: types.AUTH_ATTEMPT });
    if (!email || !password) {
      authError(dispatch, 'Must fill in all required fields.');
    } else {
      fbAPI.login(data, (success, error) => authCallback(dispatch, success, error));
    }
  };
};

export const register = data => {
  const { firstName, lastName, year, email, role, password, confirmPassword } = data;
  return dispatch => {
    dispatch({ type: types.AUTH_ATTEMPT });
    if (!firstName || !lastName || !year || !email || !role || !password || !confirmPassword) {
      authError(dispatch, 'Must fill in all required fields.');
    } else if (password !== confirmPassword) {
      authError(dispatch, 'Passwords do not match.');
    } else {
      fbAPI.register(data, (success, error) => authCallback(dispatch, success, error));
    }
  };
};

export const logout = () => {
  console.log('logout');
  return dispatch => {
    // remove Firebase Auth State Observer
    dispatch({ type: types.LOGOUT_ATTEMPT });
    unsubscribe();
    fbAPI.logout((success, error) => {
      if (success) {
        dispatch({
          type: types.LOGOUT_SUCCESS
        });
        NavigationService.navigate('Splash');
      } else {
        dispatch({
          type: types.LOGOUT_ERROR,
          payload: error
        });
      }
    });
  };
};

function getUser(dispatch, authUser) {
  console.log('getUser');
  if (authUser !== null) {
    fbAPI.getUser(authUser, (success, user, error) => {
      if (success) {
        //user authenticated and retrieved doc
        dispatch({
          type: types.LOGGED_IN,
          payload: user
        });
        NavigationService.navigate('App');
      } else {
        // user authenticated, but unable to retrieve doc
        console.log(error);
        logout();
      }
    });
  } else {
    // user not authenticated
    logout();
  }
}

function authCallback(dispatch, success, error) {
  if (success) {
    authSuccess(dispatch);
  } else {
    authError(dispatch, error);
  }
}

function authSuccess(dispatch) {
  console.log('authSuccess');
  // set Firebase Auth State Observer
  unsubscribe = auth.onAuthStateChanged(authUser => {
    console.log('onAuthStateChanged');
    getUser(dispatch, authUser);
  });
}

function authError(dispatch, error) {
  dispatch({
    type: types.AUTH_ERROR,
    payload: error
  });
}
