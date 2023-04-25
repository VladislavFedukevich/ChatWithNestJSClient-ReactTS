import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import UsersList from './../screens/UserLists/UserLists';
import History from './../screens/History/History';
import Auth from '../screens/Auth/Auth';

const routes: RouteObject[] = [
    {
        path: '/chat/dialogs',
        element: <UsersList />,
    },
    {
        path: '/chat/dialogs/:user',
        element: <History />,
    },
    {
        path: '/auth',
        element: <Auth />
    }
];

const Routers = () => {
    const element = useRoutes(routes);
    return element;
};

export default Routers;
