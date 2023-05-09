import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';

import { Message } from '../../interface/Message';

import { MessageContainer, MessageItem, HistoryContainer, Input, InputContainer, CallButton, Button, Container } from './styled';

const Dialog: React.FC = () => {
    const [dialog, setDialog] = useState<Message[]>([]);
    const [message, setMessages] = useState<any>('');
    const [inputValue, setInputValue] = useState<any>('');
    const location = useLocation();
    const [socket, setSocket] = useState<Socket | null>(null);
    const navigate = useNavigate();

    const currentUser = localStorage.getItem('user');
    const searchParams = new URLSearchParams(location.search);
    const selectedUser = searchParams.get('login') || '';

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get<any, AxiosResponse<any>>(
                `http://localhost:5000/chat/dialog?login=${selectedUser}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response: AxiosResponse<any>) => {
                const data: Array<object> = response.data;
                const dialog: Message[] = data
                    .map((elem: any) => ({
                        id: elem.id,
                        login: elem.selectedUser,
                        text: elem.text,
                        recipient: selectedUser,
                    }))
                    .sort((a: Message, b: Message) => a.id - b.id); // Сортируем по id сообщения
                setDialog(dialog);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            setInputValue(`You are writing as ${currentUser} to ${selectedUser}`);

            const socket = io('http://localhost:5000');
            socket.on('connect', () => {
                socket.emit('joinRoom', [currentUser, selectedUser]);
            });

            socket.on('msgToClient', (message: Message) => {
                setDialog((prevDialog) => [...prevDialog, message]);
                setInputValue('');
            });

            setSocket(socket);
        } else {
            setInputValue('');
            setDialog([]);
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [selectedUser, currentUser]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (socket) {
            const message: Message = {
                id: Math.floor(new Date().getTime() / 10000),
                login: currentUser,
                text: inputValue.replace(`You are writing as ${currentUser} to ${selectedUser} `, ''),
                recipient: selectedUser
            };
            socket.emit('msgToServer', message);
            setDialog([...dialog, message]);
            setInputValue('');
        } else {
            console.log('Socket not connected');
        }
    };

    const makeCall = () => {
        navigate(`/chat/call/:${selectedUser}`);
    };

    return (
        <Container>
            <HistoryContainer>
                <MessageContainer>
                    {dialog.map((message, index) => (
                        <MessageItem key={index} from={message.login === currentUser ? 'right' : 'left'}>
                            <span>{message.text}</span>
                        </MessageItem>
                    ))}
                </MessageContainer>
                <InputContainer onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Type your message..." value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                    <Button type="submit">Send</Button>
                </InputContainer>
                <CallButton onClick={makeCall}>Call</CallButton>
            </HistoryContainer>
        </Container>
    );
};

export default Dialog;
