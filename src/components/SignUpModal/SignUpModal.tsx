import React, { useState } from 'react';
import styles from './SignUpModal.module.css';

interface SignUpModalProps {
    setIsOpen: (value: boolean) => void
}

interface CreditCardInfo {
    number: string,
    expiration: string,
    cvc: string
}

const CreditCardForm = () => {
    const [cardInfo, setCardInfo] = useState<CreditCardInfo>({
        number: '',
        expiration: '',
        cvc: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardInfo({ ...cardInfo, [name]: value });
    };

    return (
        <form className={styles.creditCardForm}>
            <div className={styles.formGroup}>
                <label>Card number</label>
                <input 
                    type="text"
                    name="number"
                    value={cardInfo.number}
                    onChange={handleInputChange}
                    placeholder="1234 1234 1234 1234"
                />
            </div>
            <div>
                <div className={styles.formGroup}>
                    <label>Expiration</label>
                    <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiration}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>CVC</label>
                    <input
                        type="text"
                        name="cvc"
                        value={cardInfo.cvc}
                        onChange={handleInputChange}
                        placeholder="CVC"
                    />
                </div>
            </div>
            <div className={styles.formGroup}>

            </div>
        </form>
    )
}

const SignUpModal = ({setIsOpen} : SignUpModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSignUpPage, setShowSignupPage] = useState(true);
    const [showLoginPage, setShowLoginPage] = useState(false);
    // Maybe place credit card info here?

    const SignUpForm = () => {
        const onSubmitSignUpForm = () => {

        }

        return (
            <form onSubmit={onSubmitSignUpForm}>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" />
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <CreditCardForm />
                <input type="submit" value="Submit" />
            </form>
        )
    }

    const LoginForm = () => {
        const onSubmitLoginForm = () => {

        }

        return (
            <form>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
            </form>
        )
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
                            {/* <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                                X
                            </button> */}
                            <div className={styles.formSelectorTabs}>
                                <div className={`${styles.formTab} ${!showSignUpPage ? styles.unselectedTab : ''}`} onClick={openSignUpForm}>Sign Up</div>
                                <div className={`${styles.formTab} ${!showLoginPage ? styles.unselectedTab : ''}`} onClick={openLoginForm}>Sign In</div>
                            </div>
                        </div>
                        <div className={styles.modalContent}>
                            {!!showSignUpPage && <SignUpForm />}
                            {!!showLoginPage && <LoginForm />}
                        </div>
                </div>
            </div>
        </>
    )
}

export default SignUpModal;