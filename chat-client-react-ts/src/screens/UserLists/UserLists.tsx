import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { UserList, User, UsersListWrapper, HeaderWrapper } from './styled';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('user');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get<any, AxiosResponse<any>>('http://localhost:5000/chat/dialogs', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: AxiosResponse<any>) => {
                const data: Array<object> = response.data;
                const users: Array<string> = data.map((elem: any) => elem.login);
                setUsers(users);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    const handleUserClick = (user: string) => {
        setSelectedUser(user);
        navigate(`/chat/dialog?login=${encodeURIComponent(user)}`);
        console.log(user);
    };

    return (
        <UsersListWrapper>
            <HeaderWrapper>List of Users</HeaderWrapper>
            <UserList>
                {users
                    .filter((user) => user !== currentUser)
                    .map((user) => (
                        <User key={user} onClick={() => handleUserClick(user)}>
                            {user}
                        </User>
                    ))}
            </UserList>
        </UsersListWrapper>
    );
};

export default UsersList;
