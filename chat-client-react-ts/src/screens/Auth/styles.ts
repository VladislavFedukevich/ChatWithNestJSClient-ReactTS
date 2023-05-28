import styled from 'styled-components';

export const AuthHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  background-color: #007991;
`;

export const AuthTitle = styled.h1`
  color: #fff;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 30rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const FormInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  background-color: #007991;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  margin-top: 1rem;
  color: red;
  font-size: 1.2rem;
`;
