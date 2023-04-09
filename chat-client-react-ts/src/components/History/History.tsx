import React from 'react';

import { MessageHistoryContainer, MessageItem, MessageSender, MessageText, MessageTimestamp } from './styled';

import { Message } from '../../interface/Message';

interface Props {
  messages: Message[];
}

const History: React.FC<Props> = ({ messages }) => {
  return (
    <MessageHistoryContainer>
      {messages.map((message: Message) => (
        <MessageItem key={message.id} isMine={message.sender === 'me'}>
          <MessageText isMine={message.sender === 'me'}>
            {message.text}
          </MessageText>
          <MessageSender isMine={message.sender === 'me'}>
            {message.sender}
          </MessageSender>
          <MessageTimestamp isMine={message.sender === 'me'}>
            {message.timestamp}
          </MessageTimestamp>
        </MessageItem>
      ))}
    </MessageHistoryContainer>
  );
};

export default History;
