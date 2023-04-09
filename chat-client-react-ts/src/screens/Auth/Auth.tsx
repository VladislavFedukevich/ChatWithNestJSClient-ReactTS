import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { signUp } from '../../api/signUp';

import { FormContainer, FormInput, FormButton, FormLogin, FormReg } from './styles';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  login: string;
  password: string;
};

type RegistrationFormValues = {
  login: string;
  password: string;
};

type Props = {
  onSubmit: (values: LoginFormValues | RegistrationFormValues) => void;
};

const Auth: React.FC<Props> = ({ onSubmit }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (login: string, password: string) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post('http://localhost:5000/auth/signin', { login, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/chatPage');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data || 'Unknown error occurred');
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      await handleLogin(login, password);
    } else {
      try {
        await signUp(login, password);
        await handleLogin(login, password);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || 'Unknown error occurred');
        } else {
          setError('Unknown error occurred');
        }
      }
    }
  };

  return (
    <FormContainer>
      <div style={{ display: 'flex', textAlign: 'center', width: 420, justifyContent: 'space-around', border: '1px solid black' }}>
        <FormLogin
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}>Login</FormLogin>
        <FormReg
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >Register</FormReg>
      </div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          placeholder='Email'
          value={login}
          onChange={(event: any) => setLogin(event.target.value)}
        />
        <FormInput
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event: any) => setPassword(event.target.value)}
        />
        <FormButton type='submit'>{isLogin ? 'Login' : 'Register'}</FormButton>
      </form>
    </FormContainer>
  );
};

export default Auth;
