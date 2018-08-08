import * as types from './actionTypes';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  year: '',
  email: 'admin@utexas.edu',
  password: 'password',
  confirmPassword: '',
  user: null,
  error: '',
  loading: ''
};

const FORM_INITIAL_STATE = {
  firstName: '',
  lastName: '',
  year: '',
  email: 'admin@utexas.edu',
  password: 'password',
  confirmPassword: '',
  error: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CLEAR_FORM:
      return { ...state, ...FORM_INITIAL_STATE };
    case types.INPUT_CHANGED:
      // action.payload ==== { prop: 'name', value 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };

    case types.AUTH_REQUEST:
      return { ...state, ...INITIAL_STATE };
    case types.AUTH_SUCCESS:
      return { ...state };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true, error: '' };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: action.error,
        password: '',
        confirmPassword: '',
        loading: false
      };
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        password: '',
        loading: false
      };

    case types.FETCH_USER_SUCCESS:
      return { ...state, user: action.user };
    case types.FETCH_USER_FAILURE:
      return { ...state };

    // case types.LOGGED_IN:
    //   console.tron.log('LOGGED_IN:', action.payload);
    //   return { ...state, user: action.payload };

    case types.LOGOUT_REQUEST:
      return { ...state, loading: true, error: '' };
    case types.LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
