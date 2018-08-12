import * as types from './actionTypes';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { ...state, ...INITIAL_STATE };
    case types.AUTH_SUCCESS:
      return { ...state };

    case types.REGISTER_REQUEST:
      return { ...state, error: '', loading: true };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };
    case types.LOGIN_REQUEST:
      return { ...state, error: '', loading: true };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };

    case types.SEND_VERIFICATION_EMAIL_REQUEST:
      return { ...state, error: '', loading: true };
    case types.SEND_VERIFICATION_EMAIL_SUCCESS:
      return { ...state, error: '', loading: false };
    case types.VERIFICATION_STATUS_REQUEST:
      return { ...state, error: '', loading: true };
      case types.VERIFICATION_STATUS_FAILURE:
      return { ...state, loading: false };
    case types.VERIFY_EMAIL_FLOW_FAILURE:
      return {
        ...state,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };

    case types.FETCH_USER_SUCCESS:
      return { ...state, user: action.user };
    case types.FETCH_USER_FAILURE:
      return { ...state, error: `code: ${action.error.code}\nmessage: ${action.error.message}` };

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
