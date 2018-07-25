import * as types from './actionTypes';

const INITIAL_STATE = {
  announcements: null,
  error: '',
  title: '',
  body: '',
  membersChecked: false,
  studentsChecked: false
};

const FORM_INITIAL_STATE = {
  title: '',
  body: '',
  membersChecked: false,
  studentsChecked: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ANNOUNCEMENTS:
      console.log('FETCH_ANNOUNCEMENTS', action.payload);
      return { ...state, announcements: action.payload };
    case types.FETCH_ANNOUNCEMENTS_ERROR:
      return { ...state, error: action.payload };

    case types.CLEAR_FORM:
      return { ...state, ...FORM_INITIAL_STATE };
    case types.INPUT_CHANGED:
      // action.payload ==== { prop: 'name', value 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case types.TOGGLE_SELECTABLE:
      return { ...state, [action.payload.prop]: action.payload.toggledValue };

    case types.CREATE_ANNOUNCEMENT:
      console.log('CREATE_ANNOUNCEMENT', action.payload);
      return { ...state, announcements: { [action.payload.id]: action.payload.val }, ...state.announcements };
    case types.CREATE_ANNOUNCEMENT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
