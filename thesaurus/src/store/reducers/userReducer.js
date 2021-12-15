const SET_USER = 'SET_USER';
const SET_USER_ERROR = 'SET_USER_ERROR';
const LOG_OUT = 'LOG_OUT';

const defaultState = {
  currentUser: {},
  isAuth: false,
  error: ''
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
        error: ''
      };
    case SET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setUserError = (error) => ({type: SET_USER_ERROR, payload: error});
export const logOut = () => ({type: LOG_OUT, payload: {}})
