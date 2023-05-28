import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  color: #222;
  font-family: Arial, sans-serif;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  min-height: 540px;
  overflow: auto;
`;

export const MessageItem = styled.div<{ from: string, currentUser: any }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: ${props => props.from === 'right' ? 'flex-end' : 'flex-start'};
    background-color: ${props => props.from === 'right' ? '#007991' : '#e5e5ea'};
    color: ${props => props.from === 'right' ? '#fff' : '#000'};
    padding: 10px;
    border-radius: 10px;
    text-align: ${props => props.from === 'right' ? 'right' : 'left'};
    word-wrap: break-word;
  }

  p {
    display: flex;
    margin: 0 0 5px 0;
    padding: 0;
    font-size: 12px;
  }

  align-self: ${props => props.from === 'right' ? 'flex-end' : 'flex-start'};
  margin-left: ${props => props.from === 'right' && props.currentUser !== props.from ? 'auto' : 0};
  margin-right: ${props => props.from === 'left' && props.currentUser !== props.from ? 'auto' : 0};
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  overflow: auto;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #007991;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  left: 20px;
  right: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  color: #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: white;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 5px;

  &:hover {
    background-color: #0069d9;
  }
`;

export const CallButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
  margin-left: auto;
`;
