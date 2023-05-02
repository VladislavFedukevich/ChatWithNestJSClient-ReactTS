import { useRoutes, RouteObject } from 'react-router-dom';
import UsersList from './../screens/UserLists/UserLists';
import Auth from '../screens/Auth/Auth';
import Dialog from '../screens/Dialog/Dialog';

const routes: RouteObject[] = [
    {
        path: '/chat/dialogs',
        element: <UsersList />,
    },
    {
        path: '/chat/dialog',
        element: <Dialog />,
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/',
        element: <Auth />
    }
];

const Routers = () => {
    const element = useRoutes(routes);
    return element;
};

export default Routers;
