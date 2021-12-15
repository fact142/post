import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/user';
import { Link } from 'react-router-dom';
import SingUp from './SingUp';
import { setUserError } from '../../store/reducers/userReducer';

const Login = () =>
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
return (
  <div className="loginPage">
    <form onSubmit={onSubmit} className="authForm">
      <p>Вход</p>
      <input className="authInput" value={email} onChange={(e) => setEmail(e.target.value) } type="email" placeholder="Логин"/>
      <input className="authInput" value={password} onChange={(e) => setPassword(e.target.value) } type="password" placeholder="Пароль"/>
      <button className="authButton">Войти </button>
      <p>{error}</p>
      <p><Link to={"/registration"}>Еще нет аккаунта? Создайте его здесь!</Link></p>
    </form>
  </div>
  )
}

export default Login
