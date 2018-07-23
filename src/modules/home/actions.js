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

