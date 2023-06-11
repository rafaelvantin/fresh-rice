import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import ManageProducts from './ManageProducts';
import ManageAdmins from './ManageAdmins';
import Home from './Home';
import About from './About';
import { Login, Signup, PasswordRecovery } from './Auth';
import Shop from './Shop';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';

const pagesData = [
    {
        path: '/',
        element: <Home />
    },
    {
        path:'/shop',
        element: <Shop />
    },
    {
        path: '/shop/product',
        element: <Product />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/cart/checkout',
        element: <Checkout />
    },
    {
        path: '/about',
        element: <About />  
    },
    {
        path: '/login',
        element: <Login />, 
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/recover-password',
        element: <PasswordRecovery />,
    },
    {
        path: '/admin',
        element: <HomeAdmin />,
    },
    {
        path: '/admin/clients',
        element: <ManageClients />,
    },
    {
        path: '/admin/products',
        element: <ManageProducts />,
    },
    {
        path: '/admin/admins',
        element: <ManageAdmins />,
    },
    // {
    //     path: '/admin/clients/:id',
    //     element: <ManageClients />,
    // And then const {id} = useParams(); (react-router-dom)
    // }
];

const router = createBrowserRouter(pagesData);

const Router = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default Router;
