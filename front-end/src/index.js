import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Router from './pages/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthProvider } from './auth-handler';
import CartState from './context/Cart/CartState';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
        <CartState>
            <Router />
        </CartState>
    </AuthProvider>
    <ToastContainer position='bottom-center' newestOnTop={true} autoClose={2500}/>
  </React.StrictMode>
);
