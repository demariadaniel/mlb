import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));