import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Router from './pages/router';
import CartState from './context/Cart/CartState';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartState >
    <Router />
    <ToastContainer position='bottom-center' newestOnTop={true}/>

    </CartState>
  </React.StrictMode>
);
