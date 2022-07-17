import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {store} from './store/index'
import './index.css';
import 'antd/dist/antd.css'
import App  from './App';
import { BrowserRouter,HashRouter } from "react-router-dom";


ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App></App>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

