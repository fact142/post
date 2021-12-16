const SET_USER = 'SET_USER';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';
const LOG_OUT = 'LOG_OUT';

const defaultState = {
  currentUser: {},
  isAuth: false,
  loginError: '',
  signUpError: '',
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
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    case SET_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
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
export const setLoginError = (error) => ({type: SET_LOGIN_ERROR, payload: error});
export const setSignupError = (error) => ({type: SET_SIGNUP_ERROR, payload: error});
export const logOut = () => ({type: LOG_OUT, payload: {}})
