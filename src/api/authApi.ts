import axios from './axios';

const SIGN_UP_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';

export interface SignUpRequestData {
    name: string,
    email: string,
    confirmationToken: string
}

export interface LoginRequestData {
    email: string,
    password: string
}

export const signUp = async (body: SignUpRequestData) => {
    const response = await axios.post(SIGN_UP_URL, body);
    return response;
}

export const login = async (body: LoginRequestData) => {
    const response = await axios.post(LOGIN_URL, body);
    return response;
}