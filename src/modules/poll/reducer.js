import * as types from './actionTypes';

const INITIAL_STATE = {
  error: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_POLLS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_POLLS_SUCCESS: {
      return { ...state, polls: action.polls, loading: false };
    }
    case types.FETCH_POLLS_FAILURE:
      return {
        ...state,
        polls: action.polls,
        error: `code: ${action.error.code}\nmessage: ${action.error.message}`,
        loading: false
      };

    case types.CREATE_POLL_SUCCESS:
      return { ...state, polls: action.polls };

    default:
      return state;
  }
};
