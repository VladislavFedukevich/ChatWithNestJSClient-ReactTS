import styled from 'styled-components'

export const MessageHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 400px;
`;

export const MessageItem = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isMine ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

export const MessageText = styled.div<{ isMine: boolean }>`
  background-color: ${props => props.isMine ? '#DCF8C6' : '#FFF'};
  border-radius: 5px;
  padding: 8px;
  max-width: 80%;
`;

export const MessageSender = styled.div<{ isMine: boolean }>`
  font-weight: bold;
  margin-bottom: 4px;
  text-align: ${props => props.isMine ? 'right' : 'left'};
`;

export const MessageTimestamp = styled.div<{ isMine: boolean }>`
  font-size: 12px;
  color: #777;
  text-align: ${props => props.isMine ? 'right' : 'left'};
`;
