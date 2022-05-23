import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Quiz from './lib/Quiz';
import { quiz } from './quiz'
import { quiz2 } from './quiz2';
import { quiz3 } from './quiz3';
import { Zoom } from 'react-reveal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Quiz quiz={quiz}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

