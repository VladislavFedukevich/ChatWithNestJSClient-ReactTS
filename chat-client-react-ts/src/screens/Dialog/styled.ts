import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #222;
  color: #fff;
  font-family: Arial, sans-serif;
  overflow: hidden;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const MessageItem = styled.div<{ from: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: ${props => props.from === 'right' ? 'flex-end' : 'flex-start'};
    background-color: ${props => props.from === 'right' ? '#007aff' : '#e5e5ea'};
    color: ${props => props.from === 'right' ? '#fff' : '#000'};
    padding: 10px;
    border-radius: 10px;
    text-align: ${props => props.from === 'right' ? 'right' : 'left'};
  }

  align-self: ${props => props.from === 'right' ? 'flex-end' : 'flex-start'};
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #fff;
  color: #222;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export const CallButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;
