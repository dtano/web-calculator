import React from 'react';
import './Calculator.css';
import { ADDITION, BACK_SPACE, CHANGE_SIGN, CLEAR_ALL, CLEAR_ENTRY, DECIMAL, DIVISION, EQUALS, FRACTION, MULTIPLICATION, PERCENTAGE, SQUARED, SQUARE_ROOT, SUBTRACTION } from '../../constants/operators';

interface ButtonsProps {
    showPremiumVersion: boolean,
    handleOnPress: (value: string) => void
}

const OPERATOR_BTN_STYLE = 'operatorBtn';
const EQUALS_BTN_STYLE = "equalsBtn";

const Buttons = ({showPremiumVersion, handleOnPress} : ButtonsProps) => {
    const MemoryButtons = () => {
        return (
            <div>

            </div>
        )
    }

    const onPressButton = (event: React.MouseEvent<HTMLElement>) => {
        const value: string = (event.target as HTMLElement).innerText
        handleOnPress(value)
    }

    const constructButton = (symbol: string, style?: string) => {
        return <button onClick={onPressButton} className={`calculatorBtn ${!!style ? style : ""}`}>{symbol}</button>
    }

    return (
        <div className='buttonsContainer'>
            {showPremiumVersion && <MemoryButtons />}
            <div className='buttonRow'>
                {constructButton(PERCENTAGE, OPERATOR_BTN_STYLE)}
                {constructButton(CLEAR_ENTRY, OPERATOR_BTN_STYLE)}
                {constructButton(CLEAR_ALL, OPERATOR_BTN_STYLE)}
                {constructButton(BACK_SPACE, OPERATOR_BTN_STYLE)}
            </div>
            <div className='buttonRow'>
                {constructButton(FRACTION, OPERATOR_BTN_STYLE)}
                {constructButton(SQUARED, OPERATOR_BTN_STYLE)}
                {constructButton(SQUARE_ROOT, OPERATOR_BTN_STYLE)}
                {constructButton(DIVISION, OPERATOR_BTN_STYLE)}
            </div>
            <div className='buttonRow'>
                {constructButton('7')}
                {constructButton('8')}
                {constructButton('9')}
                {constructButton(MULTIPLICATION, OPERATOR_BTN_STYLE)}
            </div>
            <div className='buttonRow'>
                {constructButton('4')}
                {constructButton('5')}
                {constructButton('6')}
                {constructButton(SUBTRACTION, OPERATOR_BTN_STYLE)}
            </div>
            <div className='buttonRow'>
                {constructButton('1')}
                {constructButton('2')}
                {constructButton('3')}
                {constructButton(ADDITION, OPERATOR_BTN_STYLE)}
            </div>
            <div className='buttonRow'>
                {constructButton(CHANGE_SIGN)}
                {constructButton('0')}
                {constructButton(DECIMAL)}
                {constructButton(EQUALS, EQUALS_BTN_STYLE)}
            </div>
        </div>
    );
}

export default Buttons;