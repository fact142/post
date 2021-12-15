import { auth, logIn, signUp, editUser, createPost } from '../../https/userAPI';
import { setUser, setUserError } from '../reducers/userReducer';
import {logOut} from '../reducers/userReducer';

export const authentication = () => async (dispatch) => {
  const response = await auth();
  await dispatch(setUser(response));
};

export const login = (email, password) => async (dispatch) => {
  const data = await logIn(email, password);
  let response;
  if(data.message){
    dispatch(setUserError(data.message))
  } else{
    if (data.token !== undefined) {
      localStorage.setItem('token', data.token);
    }
    response = await auth();
    dispatch(setUser(response));
  }
};
export const signup = (name, lastname, email, password) => async (dispatch) => {
  const data = await signUp(name, lastname, email, password);
  dispatch(setUserError(data.message))
};


export const edit = (id, name, lastname, email) => async (dispatch) => {
  const data = await editUser(id, name, lastname, email);
  localStorage.setItem('token', data.token);
  const response = await auth();
  dispatch(setUser(response));
}
export const newPost = (title, text, id) =>async (dispatch) => {
  const data = await createPost(title, text, id);
  localStorage.setItem('token', data.token);
  const response = await auth();
  dispatch(setUser(response));
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logOut());
}
