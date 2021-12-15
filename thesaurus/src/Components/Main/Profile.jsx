import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { edit, logout, newPost } from '../../store/actions/user';
import { Post } from './Post';
import { Link } from 'react-router-dom';

const Profile = () =>
{
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const posts = useSelector((state) => state.user.currentUser.posts);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const editUser = () => {
    dispatch(edit(user.id, name, lastname, email))
    setIsEdit(!isEdit)
  }
  const sendPost = () =>{
    dispatch(newPost(title, text, user.id))
  }

  return (
    <div className="main">
      <div className="header">
        <p>Website</p>
        <div>
          <button><Link to="/main">Главная</Link></button>
          <button><Link to="/profile">Мой профиль</Link></button>
          <button onClick={() => dispatch(logout())}>Выйти</button>
        </div>
      </div>
      <div className="label">
        <div className="cards">
          <div className="user-card">
            <p>Профиль</p>
            {isEdit ?
              <input value={name} onChange={(e) => setName(e.target.value)} /> :
              <div className="card-string">
                {"Имя: " + name}
              </div>
            }
            {isEdit ?
              <input value={lastname} onChange={(e) => setLastname(e.target.value)} /> :
              <div className="card-string">
                {"Фамилия: " + lastname}
              </div>
            }
            {isEdit ?
              <input value={email} onChange={(e) => setEmail(e.target.value)} /> :
              <div className="card-string">
                {"Почта: " + email}
              </div>
            }
            {!isEdit ?
              <button onClick={() => setIsEdit(!isEdit)}>Редактировать</button> :
              <button onClick={editUser}>Отправить</button>
            }
          </div>
          <div className="user-card">
            <p>Новый пост</p>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок поста"/>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст поста" />
            <button onClick={sendPost}>Отправить</button>
          </div>
        </div>
        {posts ?
          <div className="posts">
            <p>Ваши посты:</p>
            {posts.map(post => <Post title={post.title} text={post.text} author={post.name + " " + post.lastname} />)}
          </div>:
          <div className="posts">
            <p>У вас пока нет постов</p>
          </div>}
      </div>
    </div>
  )
}

export default Profile
