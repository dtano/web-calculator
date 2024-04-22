import React from 'react';
import styles from './Calculator.module.css';
import { ADDITION, BACK_SPACE, CHANGE_SIGN, CLEAR_ALL, CLEAR_ENTRY, DECIMAL_POINT, DIVISION, EQUALS, FRACTION, MEMORY_ADD, MEMORY_CLEAR, MEMORY_RECALL, MEMORY_STORE, MEMORY_SUBTRACT, MULTIPLICATION, PERCENTAGE, SQUARED, SQUARE_ROOT, SUBTRACTION } from '../../constants/operators';

interface ButtonsProps {
    showPremiumVersion: boolean,
    handleOnPress: (value: string) => void,
    isMemoryActive: boolean
}

const BASIC_BTN_STYLE = styles.basicBtn;
const OPERATOR_BTN_STYLE = styles.operatorBtn;
const EQUALS_BTN_STYLE = styles.equalsBtn;
const MEMORY_BTN_STYLE = styles.memoryBtn;

const Buttons = ({showPremiumVersion, handleOnPress, isMemoryActive} : ButtonsProps) => {
    const onPressButton = (event: React.MouseEvent<HTMLElement>) => {
        const value: string = (event.target as HTMLElement).innerText
        handleOnPress(value)
    }

    const constructButton = (symbol: string, style: string=BASIC_BTN_STYLE, disabled: boolean=false) => {
        return <button onClick={onPressButton} className={`${styles.calculatorBtn} ${style}`} disabled={disabled}>{symbol}</button>
    }

    const MemoryButtons = () => {
        return (
            <div className={styles.buttonRow}>
                {constructButton(MEMORY_CLEAR, MEMORY_BTN_STYLE, !isMemoryActive)}
                {constructButton(MEMORY_RECALL, MEMORY_BTN_STYLE, !isMemoryActive)}
                {constructButton(MEMORY_ADD, MEMORY_BTN_STYLE)}
                {constructButton(MEMORY_SUBTRACT, MEMORY_BTN_STYLE)}
                {constructButton(MEMORY_STORE, MEMORY_BTN_STYLE)}
                {constructButton('Mv', MEMORY_BTN_STYLE, !isMemoryActive)}
            </div>
        )
    }

    return (
        <div className={styles.buttonsContainer}>
            {showPremiumVersion && <MemoryButtons />}
            <div className={styles.buttonRow}>
                {constructButton(PERCENTAGE, OPERATOR_BTN_STYLE)}
                {constructButton(CLEAR_ENTRY, OPERATOR_BTN_STYLE)}
                {constructButton(CLEAR_ALL, OPERATOR_BTN_STYLE)}
                {constructButton(BACK_SPACE, OPERATOR_BTN_STYLE)}
            </div>
            <div className={styles.buttonRow}>
                {constructButton(FRACTION, OPERATOR_BTN_STYLE)}
                {constructButton(SQUARED, OPERATOR_BTN_STYLE)}
                {constructButton(SQUARE_ROOT, OPERATOR_BTN_STYLE)}
                {constructButton(DIVISION, OPERATOR_BTN_STYLE)}
            </div>
            <div className={styles.buttonRow}>
                {constructButton('7')}
                {constructButton('8')}
                {constructButton('9')}
                {constructButton(MULTIPLICATION, OPERATOR_BTN_STYLE)}
            </div>
            <div className={styles.buttonRow}>
                {constructButton('4')}
                {constructButton('5')}
                {constructButton('6')}
                {constructButton(SUBTRACTION, OPERATOR_BTN_STYLE)}
            </div>
            <div className={styles.buttonRow}>
                {constructButton('1')}
                {constructButton('2')}
                {constructButton('3')}
                {constructButton(ADDITION, OPERATOR_BTN_STYLE)}
            </div>
            <div className={styles.buttonRow}>
                {constructButton(CHANGE_SIGN)}
                {constructButton('0')}
                {constructButton(DECIMAL_POINT)}
                {constructButton(EQUALS, EQUALS_BTN_STYLE)}
            </div>
        </div>
    );
}

export default Buttons;