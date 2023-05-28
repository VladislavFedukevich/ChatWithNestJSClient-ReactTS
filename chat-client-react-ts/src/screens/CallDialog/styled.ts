import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
`;

export const Video = styled.video`
  width: 40%;
  height: auto;
  background-color: black;
  border-radius: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

export const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  margin-right: 10px;
  width: 40%;
`;

export const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: #007991;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005f73;
  }
`;
