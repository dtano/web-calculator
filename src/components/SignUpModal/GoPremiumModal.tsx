import React, { useEffect, useState } from 'react';
import styles from './GoPremiumModal.module.css';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

interface GoPremiumModalProps {
    setIsOpen: (value: boolean) => void,
    onSuccessfulLogin: (value: string) => void
}

const stripePromise = loadStripe('pk_test_51P78N501BuXQPtCdX7nyy2bbQlbbco4jHlL2uNT3MhdTkWtvMpp0uKdtBYTw4qnJmbjBceV3ZPH3j1rH4BDwa2h000QEKLqxG6');

const GoPremiumModal = ({setIsOpen, onSuccessfulLogin} : GoPremiumModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSignUpPage, setShowSignupPage] = useState(true);
    const [showLoginPage, setShowLoginPage] = useState(false);

    useEffect(() => {
        if(showSignUpPage){
            setIsLoading(true);
        }
    }, [showSignUpPage]);

    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: 1000,
        currency: 'aud',
        paymentMethodTypes: ['card']
    }

    const openSignUpForm = () => {
        if(isLoading) return;
        setShowSignupPage(true);
        setShowLoginPage(false);
    }

    const openLoginForm = () => {
        if(isLoading) return;
        setShowLoginPage(true);
        setShowSignupPage(false);
    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.formSelectorTabs}>
                                <div className={`${styles.formTab} ${!showSignUpPage ? styles.unselectedTab : ''}`} onClick={openSignUpForm}>Sign Up</div>
                                <div className={`${styles.formTab} ${!showLoginPage ? styles.unselectedTab : ''}`} onClick={openLoginForm}>Sign In</div>
                            </div>
                        </div>
                        <div className={styles.modalContent}>
                            {!!showSignUpPage && 
                                <Elements stripe={stripePromise} options={options}>
                                    <SignUpForm setIsLoading={setIsLoading} isLoading={isLoading} onSuccessfulLogin={onSuccessfulLogin}/>
                                </Elements>
                            }
                            {!!showLoginPage && <LoginForm setIsLoading={setIsLoading} isLoading={isLoading} onSuccessfulLogin={onSuccessfulLogin}/>}
                        </div>
                </div>
            </div>
        </>
    )
}

export default GoPremiumModal;