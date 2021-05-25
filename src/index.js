import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import App from './App';
import {AppState} from './context/app/AppState';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
      <AppState>
        <App/>
      </AppState>
    </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
