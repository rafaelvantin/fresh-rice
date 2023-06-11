import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeAdmin from './HomeAdmin';
import ManageClients from './ManageClients';
import ManageProducts from './ManageProducts';
import ManageAdmins from './ManageAdmins';

const pagesData = [
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
