import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const UserList = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

export const User = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #007bff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;

export const Messages = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

export const MessagesList = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #fff;
  overflow-y: auto;
`;

export const MessageItem = styled.div`
  margin-bottom: 16px;
`;

export const Sender = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  margin-bottom: 8px;
`;

export const Timestamp = styled.div`
  font-size: 0.8rem;
  color: #999;
`;

export const Form = styled.form`
  display: flex;
  padding: 16px 16px 16px 0;
  background-color: #f5f5f5;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 16px;
  border: none;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;
