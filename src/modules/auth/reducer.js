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
    case types.CLEAR_FORM:
      return { ...state, ...INITIAL_STATE };
    case types.INPUT_CHANGED:
      // action.payload ==== { prop: 'name', value 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };

    case types.AUTH_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case types.AUTH_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        password: '',
        confirmPassword: '',
        loading: false
      };
    default:
      return state;
  }
};
