import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

import { MessageContainer, Message, HistoryContainer, Input, InputContainer, CallButton, Button } from './styled';

interface Dialog {
    id: number;
    sender: string;
    recipient: string;
    text: string;
    date: string;
}

const History: React.FC = () => {
    const [dialog, setDialog] = useState<Dialog[]>([]);
    const location = useLocation();
    const currentUser = localStorage.getItem('user');
    const selectedUser = decodeURIComponent(location.pathname.split('/').pop() || '');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get<any, AxiosResponse<any>>(`http://localhost:5000/chat/dialogs/${selectedUser}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: AxiosResponse<any>) => {
                const data: Array<object> = response.data;
                const dialog: Dialog[] = data.map((elem: any) => ({
                    id: elem.id,
                    sender: elem.sender,
                    recipient: elem.recipient,
                    text: elem.text,
                    date: elem.date,
                }));
                setDialog(dialog);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [selectedUser]);

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    };

    const makeCall = () => {

    };

    return (
        <HistoryContainer>
            <MessageContainer>
                {dialog
                    .filter((message) => message.sender === currentUser || message.recipient === currentUser)
                    .map((message) => (
                        <Message key={message.id} from={message.sender === currentUser}>
                            {message.text}
                        </Message>
                    ))}
            </MessageContainer>
            <InputContainer onSubmit={sendMessage}>
                <Input type="text" placeholder="Type your message..." />
                <Button type="submit">Send</Button>
            </InputContainer>
            <div>
                <CallButton onClick={makeCall}>Call</CallButton>
            </div>
        </HistoryContainer>
    );
};

export default History;
