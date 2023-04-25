import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

import { Message } from '../../interface/Message';

import { Container, Button, Messages, MessageItem, MessagesList, Form, Input, Timestamp, Text, Sender, UserList, User } from './styled';

type Props = {};

const Chat = (props: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [users, setUsers] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const currentUser = localStorage.getItem('user');
    const selectedUser = decodeURIComponent(location.search.replace('?', ''));

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get<any, AxiosResponse<any>>('http://localhost:5000/chat/dialogs', {
            withCredentials: true, headers: {
                Authorization: `Bearer ${token}`
            }
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

    useEffect(() => {
        if (selectedUser) {
            setInputValue(`You are writing as ${currentUser} to ${selectedUser}`);

            const socket = io('http://localhost:5000');
            socket.on('connect', () => {
                socket.emit('join', { currentUser, selectedUser });
            });
            socket.on('message', (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
            setSocket(socket);
        } else {
            setInputValue('');
            setMessages([]);
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [selectedUser]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (socket) {
            const message: Message = {
                id: new Date().getTime(),
                sender: currentUser,
                receiver: selectedUser,
                text: inputValue.replace(`You are writing as ${currentUser} to ${selectedUser} `, ''),
                timestamp: new Date().toLocaleString(),
            };
            socket.emit('message', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            setInputValue('');
        }
    };

    return (
        <Container>
            <UserList>
                {users
                    .filter((user) => user !== currentUser)
                    .map((user) => (
                        <User key={user} onClick={(event) => navigate(`?${encodeURIComponent(user)}`)}>
                            {user}
                        </User>
                    ))}
            </UserList>
            <Messages>
                <MessagesList>
                    {messages.map((message) => (
                        <MessageItem key={message.id}>
                            <Sender>{message.sender}</Sender>
                            <Text>{message.text}</Text>
                            <Timestamp>{message.timestamp}</Timestamp>
                        </MessageItem>
                    ))}
                </MessagesList>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder={inputValue} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                    <Button type="submit">Send</Button>
                </Form>
            </Messages>
        </Container>
    );
};

export default Chat;
