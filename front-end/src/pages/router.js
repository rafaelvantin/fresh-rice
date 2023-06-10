import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import Home from './Home';
import About from './About';
import { Login, Signup, PasswordRecovery } from './Auth';
import Shop from './Shop';

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
];

const router = createBrowserRouter(pagesData);

const Router = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default Router;
