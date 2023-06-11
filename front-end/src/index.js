import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Router from './pages/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router />
    <ToastContainer position='bottom-center' newestOnTop={true}/>
  </React.StrictMode>
);
