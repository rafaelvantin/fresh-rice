import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import Home from './Home';
import About from './About';

const pagesData = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/admin',
        element: <HomeAdmin />,
    },
    {
        path: '/admin/clients',
        element: <ManageClients />,
    }
];

const router = createBrowserRouter(pagesData);

const Router = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default Router;
