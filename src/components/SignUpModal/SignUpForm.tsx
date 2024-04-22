import React, { useEffect, useState } from 'react';
import styles from './GoPremiumModal.module.css';
import { SignUpRequestData } from '../../api/authApi';
import * as authApi from '../../api/authApi';
import { AxiosError } from 'axios';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface SignUpInfo {
    name: string,
    email: string
}

interface FormProps {
    setIsLoading: (value: boolean) => void,
    onSuccessfulLogin: (value: string) => void,
    isLoading: boolean
}

const SignUpForm = ({setIsLoading, isLoading, onSuccessfulLogin}: FormProps) => {
    const [signUpData, setSignUpData] = useState<SignUpInfo>({
        name: '',
        email: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const stripe = useStripe();
    const elements = useElements();

    const clearFields = () => {
        setSignUpData({
            name: '',
            email: ''
        });
    }

    const onSubmitSignUpForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setShowSuccessMessage(false);
        setError(null);
        setIsLoading(true);

        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
            setError(submitError.message ?? "Payment Error");
            return;
        }

        const confirmationTokenResult = await stripe?.createConfirmationToken({
            elements,
            params: {
            }
        });
        if(!confirmationTokenResult.confirmationToken || !!confirmationTokenResult.error){
            return;
        }

        // Construct DTO to send to API
        const req: SignUpRequestData = {
            ...signUpData,
            confirmationToken: confirmationTokenResult.confirmationToken.id
        }

        // Call API
        try {
            const response = await authApi.signUp(req);
            setIsLoading(false);

            if(!response || !response?.data?.jwtToken){
                throw new Error("Failed to sign up. Please try again");
            }

            // Set success message and clear all fields
            clearFields();
            setShowSuccessMessage(true);

            onSuccessfulLogin(response.data.jwtToken);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const onCreditCardFormReady = () => {
        setIsLoading(false);
    }

    return (
        <div>
            {showSuccessMessage && <div className={styles.successMessage}>Successful Sign Up. Please check your email for the password</div>}
            {!!error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={onSubmitSignUpForm}>
                <div className={styles.horizontalGroup}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input type="text" name="name" value={signUpData.name} onChange={handleInputChange} disabled={isLoading}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" name="email" value={signUpData.email} onChange={handleInputChange} disabled={isLoading}/>
                    </div>
                </div>
                <PaymentElement className={styles.creditCardForm} onReady={onCreditCardFormReady}/>
                <input className={styles.submitBtn} type="submit" value="Submit" disabled={isLoading}/>
            </form>
        </div>
    )
}

export default SignUpForm;