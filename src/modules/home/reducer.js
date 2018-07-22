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
    case types.LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
