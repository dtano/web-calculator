import React, { useState } from 'react';
import styles from './SignUpModal.module.css';
import { SignUpRequestData } from '../../api/authApi';
import * as authApi from '../../api/authApi';
import { AxiosError } from 'axios';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface SignUpModalProps {
    setIsOpen: (value: boolean) => void
}

interface FormProps {
    setIsLoading: (value: boolean) => void,
    isLoading: boolean
}

interface SignUpInfo {
    name: string,
    email: string
}

const stripePromise = loadStripe('pk_test_51P78N501BuXQPtCdX7nyy2bbQlbbco4jHlL2uNT3MhdTkWtvMpp0uKdtBYTw4qnJmbjBceV3ZPH3j1rH4BDwa2h000QEKLqxG6');

const SignUpForm = ({setIsLoading, isLoading}: FormProps) => {
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
            console.log("SIGN UP RESPONSE", response);
            setIsLoading(false);

            if(!response){
                throw new Error("Failed to sign up. Please try again");
            }

            // Set success message and clear all fields
            clearFields();
            setShowSuccessMessage(true);
        }catch(e: unknown){
            console.log("Error Here: ", e);
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

    return (
        <div>
            {showSuccessMessage && <div className={styles.successMessage}>Successful Sign Up</div>}
            {!!error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={onSubmitSignUpForm}>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" value={signUpData.name} onChange={handleInputChange} disabled={isLoading}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" value={signUpData.email} onChange={handleInputChange} disabled={isLoading}/>
                </div>
                <PaymentElement />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

const LoginForm = ({setIsLoading, isLoading}: FormProps) => {
    const [error, setError] = useState<string | null>(null);
    const onSubmitLoginForm = () => {

    }

    return (
        <form>
            <div className={styles.formGroup}>
                <label>Email</label>
                <input type="text" name="email" disabled={isLoading}/>
            </div>
            <div className={styles.formGroup}>
                <label>Password</label>
                <input type="password" name="password" disabled={isLoading}/>
            </div>
            <input type="submit" value="Submit" />
        </form>
    )
}

const SignUpModal = ({setIsOpen} : SignUpModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSignUpPage, setShowSignupPage] = useState(true);
    const [showLoginPage, setShowLoginPage] = useState(false);

    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: 1000,
        currency: 'aud',
        paymentMethodTypes: ['card']
    }

    const openSignUpForm = () => {
        setShowSignupPage(true);
        setShowLoginPage(false);
    }

    const openLoginForm = () => {
        setShowLoginPage(true);
        setShowSignupPage(false);
    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Dialog</h5>
                            <div className={styles.formSelectorTabs}>
                                <div className={`${styles.formTab} ${!showSignUpPage ? styles.unselectedTab : ''}`} onClick={openSignUpForm}>Sign Up</div>
                                <div className={`${styles.formTab} ${!showLoginPage ? styles.unselectedTab : ''}`} onClick={openLoginForm}>Sign In</div>
                            </div>
                        </div>
                        <div className={styles.modalContent}>
                            {!!showSignUpPage && 
                                <Elements stripe={stripePromise} options={options}>
                                    <SignUpForm setIsLoading={setIsLoading} isLoading={isLoading}/>
                                </Elements>
                            }
                            {!!showLoginPage && <LoginForm setIsLoading={setIsLoading} isLoading={isLoading}/>}
                        </div>
                </div>
            </div>
        </>
    )
}

export default SignUpModal;