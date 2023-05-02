import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';

import { Message } from '../../interface/Message';

import { MessageContainer, MessageItem, HistoryContainer, Input, InputContainer, CallButton, Button } from './styled';

const Dialog: React.FC = () => {
    const [dialog, setDialog] = useState<Message[]>([]);
    const [message, setMessages] = useState<any>('');
    const [inputValue, setInputValue] = useState<any>('');
    const location = useLocation();
    const [socket, setSocket] = useState<Socket | null>(null);

    const currentUser = localStorage.getItem('user');
    const searchParams = new URLSearchParams(location.search);
    const selectedUser = searchParams.get('login') || '';

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get<any, AxiosResponse<any>>(`http://localhost:5000/chat/dialog?login=${selectedUser}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response: AxiosResponse<any>) => {
                const data: Array<object> = response.data;
                console.log(data)
                const dialog: Message[] = data.map((elem: any) => ({
                    id: elem.id,
                    login: elem.selectedUser,
                    text: elem.text,
                    recipient: selectedUser
                }));
                console.log(dialog);
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
                socket.emit('join', { currentUser, selectedUser });
            });
            socket.on('message', (message: Message) => {
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
                id: new Date().getTime(),
                login: currentUser,
                text: inputValue.replace(`You are writing as ${currentUser} to ${selectedUser} `, ''),
                recipient: selectedUser
            };
            socket.emit('msgToServer', message);
            console.log('Message sent to server:', message);
            setDialog([...dialog, message]);
            setInputValue('');
        } else {
            console.log('Socket not connected');
        }
    };

    const makeCall = () => {

    };

    return (
        <HistoryContainer>
            <MessageContainer>
                {dialog
                    .map((message, id) => (
                        <MessageItem key={id} from={message.login === currentUser}>
                            {message.text}
                        </MessageItem>
                    ))}
            </MessageContainer>
            <InputContainer onSubmit={handleSubmit}>
                <Input type="text" placeholder="Type your message..." value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <Button type="submit">Send</Button>
            </InputContainer>
            <div>
                <CallButton onClick={makeCall}>Call</CallButton>
            </div>
        </HistoryContainer>
    );
};

export default Dialog;
