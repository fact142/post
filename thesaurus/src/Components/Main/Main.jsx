import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { Link,} from 'react-router-dom';
import { getAllPosts } from '../../https/userAPI';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/user';

const Main = () =>
{
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const allPosts = await getAllPosts()
    setPosts(allPosts)
  }, [])
  return (
    <div className="main">
      <div className="header">
        <p>Website</p>
        <div>
          <button><Link to="/main">Главная</Link></button>
          <button><Link to="/profile">Мой профиль</Link></button>
          <button onClick={() => dispatch(logout())}><Link to="/login">Выйти</Link></button>
        </div>
      </div>
      <div className="label">
        {posts ?
          <div className="posts">
            <p>Все посты:</p>
            {posts.map(post => <Post title={post.title} text={post.text} author={post.name + " " + post.lastname} />)}
          </div>
          :
          <div className="posts">
            <p>У вас пока нет постов</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Main
