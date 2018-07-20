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
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lasttName: '',
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
    case INITIALIZE_FIREBASE:
      return { ...state, ...INITIAL_STATE };

    case CLEAR_FORM:
      return { ...state, ...INITIAL_STATE };
    case INPUT_CHANGED:
      // action.payload ==== { prop: 'name', value 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
   
    case LOGIN_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_FAILED:
      return { ...state, error: action.payload.error, password: '', loading: false };

    case REGISTER_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case REGISTER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case REGISTER_FAILED:
      return { ...state, error: action.payload.error, loading: false };
      case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
