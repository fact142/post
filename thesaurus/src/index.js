import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/reducers';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
  <Provider store={store}>
    <App />
  </Provider>
</Router>,
  document.getElementById('root')
);
