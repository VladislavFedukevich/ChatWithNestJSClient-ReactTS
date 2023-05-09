import { useRoutes, RouteObject } from 'react-router-dom';
import UsersList from './../screens/UserLists/UserLists';
import Auth from '../screens/Auth/Auth';
import Dialog from '../screens/Dialog/Dialog';
import CallDialog from '../screens/CallDialog/CallDialog';

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
    },
    {
        path: 'chat/call/:login',
        element: <CallDialog />
    }
];

const Routers = () => {
    const element = useRoutes(routes);
    return element;
};

export default Routers;
