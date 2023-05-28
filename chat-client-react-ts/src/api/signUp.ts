import axios from 'axios';

export const signUp = async (login: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/signup', { login, password }, {withCredentials: true});
        const token = response.data.token;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error: any) {
        console.log(error.response?.data);
        throw error;
    }
};
