import React, { useState } from 'react';
import styles from './GoPremiumModal.module.css';
import * as authApi from '../../api/authApi';
import { AxiosError } from 'axios';

interface FormProps {
    setIsLoading: (value: boolean) => void,
    isLoading: boolean,
    onSuccessfulLogin: (value: string) => void
}

const LoginForm = ({setIsLoading, isLoading, onSuccessfulLogin}: FormProps) => {
    const [loginInfo, setLoginInfo] = useState<authApi.LoginRequestData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };
    
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await authApi.login(loginInfo);
            if(!response || !response.data?.token){
                setError("Failed to login. Please try again");
                return;
            }

            onSuccessfulLogin(response.data.token);
        }catch(e: unknown){
            setIsLoading(false);
            if (typeof e === "string") {
                setError(e.toUpperCase());
            } else if (e instanceof AxiosError){
                setError(e.response?.data)
            } else if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
    }

    return (
        <div className={styles.loginForm}>
            {!!error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" value={loginInfo.email} onChange={handleInputChange} disabled={isLoading}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" name="password" value={loginInfo.password} onChange={handleInputChange} disabled={isLoading}/>
                </div>
                <input className={styles.submitBtn} type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LoginForm;