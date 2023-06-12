import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
        path: '/about',
        element: <About />  
    },
    {
        path: '/login',
        element: <Login />, 
    },
    {
        path: '/cadastro',
        element: <Signup />,
    },
    {
        path: '/recuperar-senha',
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
        path: '/admin/products/add',
        element: <NewProduct />,
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
