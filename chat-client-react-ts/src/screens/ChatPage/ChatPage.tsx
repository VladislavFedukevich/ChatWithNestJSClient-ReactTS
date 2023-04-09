import React from 'react'

import History from '../../components/History/History'

import { Message } from '../../interface/Message'

type Props = {}

const ChatPage = (props: Props) => {
  const messages: Message[] = [
    {
      id: 1,
      sender: 'me',
      text: 'Hello, how are you?',
      timestamp: '2023-03-29T09:00:00.000Z',
    },
    {
      id: 2,
      sender: 'you',
      text: 'I am fine, thank you. And you?',
      timestamp: '2023-03-29T09:01:00.000Z',
    },
    {
      id: 3,
      sender: 'me',
      text: 'I am also fine, thanks.',
      timestamp: '2023-03-29T09:02:00.000Z',
    },
  ];
  return (
    <History messages={messages}/>
  )
}

export default ChatPage
