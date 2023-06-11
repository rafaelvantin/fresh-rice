import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Router from './pages/router';
import CartState from './context/Cart/CartState';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartState >
    <Router />
    </CartState>
  </React.StrictMode>
);
