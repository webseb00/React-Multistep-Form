import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './router/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

const root = document.querySelector('#root');

render(
  <App />,
  root
);