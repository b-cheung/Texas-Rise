import firebase from 'firebase';
import * as fbAPI from '../../core/firebase/fbAPI';
import * as types from './actionTypes';
import NavigationService from '../../core/navigation/NavigationService';

export const initializationStart = () => {
  return {
    type: types.INITIALIZATION_START
  };
};

export const authRequest = () => {
  return {
    type: types.AUTH_REQUEST,
    authUser: null
  };
};

export const loginRequest = data => {
  return {
    type: types.LOGIN_REQUEST,
    data
  };
};

// data = { firstName, lastName, year, email, password, confirmPassword }
export const registerRequest = data => {
  return {
    type: types.REGISTER_REQUEST,
    data
  };
};

export const sendVerificationEmail = () => {
  return {
    type: types.SEND_VERIFICATION_EMAIL_REQUEST
  };
};

export const checkVerificationStatus = () => {
  return {
    type: types.VERIFICATION_STATUS_REQUEST
  };
};

export const logoutRequest = () => {
  return {
    type: types.LOGOUT_REQUEST
  };
};
