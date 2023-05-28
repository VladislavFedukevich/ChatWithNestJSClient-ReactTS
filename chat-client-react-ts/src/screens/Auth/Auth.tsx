import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { signUp } from '../../api/signUp';

import { AuthHeader, AuthContainer, AuthTitle, Form, FormButton, FormInput, FormLabel, ErrorMessage } from './styles';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>('');
    const navigate = useNavigate();

    const handleLogin = async (login: string, password: string) => {
        try {
            const response: AxiosResponse<any, any> = await axios.post('http://localhost:5000/auth/signin',
            { login, password },
            { withCredentials: true},
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', login);

            if (token) {
                const chatResp1: AxiosResponse<any, any> = await axios.get(`http://localhost:5000/chat/dialogs`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(chatResp1);
                if (chatResp1) {
                    navigate(`/chat/dialogs/`);
                }
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                setError(error.response?.data || 'Unknown error occurred');
            } else {
                setError('Unknown error occurred');
            }
        }
    }

    const handleSignUp = async (login: string, password: string) => {
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLogin) {
            await handleLogin(login, password);
        } else {
            await handleSignUp(login, password);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <>
            <AuthContainer>
                <h1>{isLogin ? 'Login' : 'Register'}</h1>
                <Form onSubmit={handleSubmit}>
                    <FormLabel htmlFor="login">Login</FormLabel>
                    <FormInput
                        type="text"
                        id="login"
                        value={login}
                        onChange={(event: any) => setLogin(event.target.value)}
                    />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                    />
                    <FormButton type="submit">{isLogin ? 'Login' : 'Register'}</FormButton>
                </Form>
                {error && <ErrorMessage>{error.message || error}</ErrorMessage>}
                <p>{isLogin ? 'Don\'t have an account?' : 'Already have an account?'}</p>
                <FormButton onClick={toggleForm}>{isLogin ? 'Register' : 'Login'}</FormButton>
            </AuthContainer>
        </>
    );
};

export default Auth;
