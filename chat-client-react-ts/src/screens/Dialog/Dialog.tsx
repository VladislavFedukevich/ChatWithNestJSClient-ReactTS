import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';

import { Message } from '../../interface/Message';

import { MessageContainer, MessageItem, HistoryContainer, Input, InputContainer, CallButton, Button, Container } from './styled';

const Dialog: React.FC = () => {
    const [dialog, setDialog] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<any>('');
    const location = useLocation();
    const [socket, setSocket] = useState<Socket | null>(null);
    const navigate = useNavigate();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const currentUser = localStorage.getItem('user');
    const searchParams = new URLSearchParams(location.search);
    const selectedUser = searchParams.get('login') || '';

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${month}.${day}.${year}-${hours}.${minutes}`;
    };

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
                        login: elem.login,
                        text: elem.text,
                        recipient: elem.recipient,
                        time: formatDate(elem.createdAt)
                    }))
                    .sort((a: Message, b: Message) => a.id - b.id);
                setDialog(dialog);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            setInputValue('');

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

    useEffect(() => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 200);
    }, [dialog]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() !== '' && socket) {
            const message: Message = {
                id: Math.floor(new Date().getTime() / 10000),
                login: currentUser,
                text: inputValue.replace(`You are writing as ${currentUser} to ${selectedUser} `, ''),
                recipient: selectedUser,
                time: formatDate(new Date().toISOString())
            };
            socket.emit('msgToServer', message);
            setDialog([...dialog, message]);
            setInputValue('');
        } else {
            console.log('Socket not connected or message is empty');
        }
    };

    const makeCall = () => {
        navigate(`/chat/call/:${selectedUser}`);
    };

    return (
        <Container>
            <HistoryContainer ref={bottomRef}>
                <MessageContainer>
                    {dialog.map((message, index) => (
                        <MessageItem
                            key={index}
                            from={message.login === currentUser ? 'right' : 'left'}
                            currentUser={currentUser}
                        >
                            <span>{message.text}</span>
                            <p>{message.time}</p>
                        </MessageItem>
                    ))}
                </MessageContainer>
                <>
                    <InputContainer onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                        <Button type="submit">Send</Button>
                        <CallButton onClick={makeCall}>Call</CallButton>

                    </InputContainer>
                </>

            </HistoryContainer>
        </Container>
    );
};

export default Dialog;
