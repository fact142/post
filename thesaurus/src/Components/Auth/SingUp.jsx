import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/actions/user';
import { Link } from 'react-router-dom';
import { setUserError } from '../../store/reducers/userReducer';

const SignUp = () =>
{
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error);


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(name, lastname, email, password));
  }
  return (
    <div className="loginPage">
      <form className="authForm" onSubmit={onSubmit}>
        <p>Регистрация</p>
        <input className="authInput" value={name} onChange={(e) => setName(e.target.value) } type="text" placeholder="Имя"/>
        <input className="authInput" value={lastname} onChange={(e) => setLastname(e.target.value) } type="text" placeholder="Фамилия"/>
        <input className="authInput" value={email} onChange={(e) => setEmail(e.target.value) } type="email" placeholder="Логин"/>
        <input className="authInput" value={password} onChange={(e) => setPassword(e.target.value) } type="password" placeholder="Пароль"/>
        <button className="authButton" type="submit">Регистрирация</button>
        <p>{error}</p>
        <p><Link to="/login">Go to login</Link></p>
      </form>
    </div>
  )
}

export default SignUp
