import './App.css';
import Login from './Components/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignUp from './Components/Auth/SingUp';
import { authentication } from './store/actions/user';
import { Error404 } from './Components/Errors/Error404';
import { Error401 } from './Components/Errors/Error401';
import Profile from './Components/Main/Profile';
import Main from './Components/Main/Main';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authentication());
    }
  }, [dispatch, isAuth]);
  return (
    <BrowserRouter>
      {!isAuth ? (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/registration" component={SignUp} />
            <Route path='/profile' component={Login} />
            <Route path='/main' component={Error401} />
            <Redirect from='/' to='/login' />
            <Route component={Error404}/>
          </Switch>
        )
        : (
          <Switch>
            <Redirect from="/login" to="/profile" />
            <Route path='/main' component={Main} />
            <Route path="/profile" component={Profile} />
            <Route component={Error404} />
          </Switch>
        )}
    </BrowserRouter>
  );
}

export default App;
