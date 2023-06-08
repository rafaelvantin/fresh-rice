import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import Home from './Home';

const pagesData = [
    {
        path: '/',
        element: <Home />
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
