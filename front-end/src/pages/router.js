import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RouteGuard from '../components/RouteGuard';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import ManageProducts from './ManageProducts';
import ManageAdmins from './ManageAdmins';
import NewProduct from './NewProduct';
import Home from './Home';
import About from './About';
import { Login, Signup, PasswordRecovery } from './Auth';
import Shop from './Shop';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';

const Router = () => {

    const pagesData = [
        {
            path: '/',
            index: true,
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
            element: <Cart />,
        },
        {
            path: '/cart/checkout',
            element: <RouteGuard />,
            children: [
                {
                    index: true,
                    element: <Checkout />
                }
            ]
        },
        {
            path: '/about',
            element: <About />  
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <RouteGuard authenticated={false} />,
            children: [
                {
                    index: true,
                    element: <Signup />
                }
            ]
        },
        {
            path: '/recover-password',
            element: <RouteGuard authenticated={false} />,
            children: [
                {
                    index: true,
                    element: <PasswordRecovery />
                }
            ]
        },
        {
            path: '/admin',
            element: <RouteGuard type='admin' />,
            children: [
                {
                    index: true,
                    element: <HomeAdmin />
                },
                {
                    path: '/admin/clients',
                    element: <ManageClients />
                },
                {
                    path: '/admin/products/add',
                    element: <NewProduct />
                },
                {
                    path: '/admin/products',
                    element: <ManageProducts />,
                },
                {
                    path: '/admin/admins',
                    element: <ManageAdmins />
                }
            ]
        }
    ];
    
    const router = createBrowserRouter(pagesData);

    return (
        <RouterProvider router={router} />
    );
}

export default Router;
