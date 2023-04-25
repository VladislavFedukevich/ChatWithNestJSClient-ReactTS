import styled from "styled-components";

export const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

export const Message = styled.div<{ from: boolean }>`
  max-width: 60%;
  padding: 10px;
  border-radius: 5px;
  align-self: ${({ from }) => from ? 'flex-end' : 'flex-start'};
  background-color: ${({ from }) => from ? '#007bff' : '#f2f2f2'};
  color: ${({ from }) => from ? '#fff' : '#333'};
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
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
