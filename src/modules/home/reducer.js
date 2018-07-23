import * as types from './actionTypes';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  gradeLevel: '',
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
  error: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
