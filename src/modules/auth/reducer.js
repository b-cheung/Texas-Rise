import * as types from './actionTypes';

const FORM_INITIAL_STATE = {
  firstName: '',
  lastName: '',
  year: '',
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
  error: '',
  loading: ''
};
const NULL_USER = {
  user: null,
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  year: ''
};

export default (state = FORM_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CLEAR_FORM:
      return { ...state, ...FORM_INITIAL_STATE };
    case types.INPUT_CHANGED:
      // action.payload ==== { prop: 'name', value 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };

    case types.AUTH_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case types.AUTH_SUCCESS:
      return { ...state, ...FORM_INITIAL_STATE, user: action.payload };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        password: '',
        confirmPassword: '',
        loading: false
      };
    
    case types.LOGGED_IN:
      console.log('LOGGED_IN:', action.payload);
      return { ...state, user: action.payload };
    case types.LOGOUT_ERROR:
      console.log('LOGOUT_ERROR:', action.payload);
      return state;
    /*case types.LOGGED_OUT:
    console.log('LOGGED_OUT action.payload:', action.payload);
      return { ...state, user: null };
      case types.LOGOUT:
      return { ...state, user: null };*/
    default:
      return state;
  }
};
