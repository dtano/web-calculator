import React, { useState } from 'react';
import './Calculator.css';
import Buttons from './Buttons';

interface CalculatorProps {
    showPremiumVersion: boolean
}

const Calculator = ({showPremiumVersion} : CalculatorProps) => {
    const [currentValue, setCurrentValue] = useState("0");

    const ValueScreen = () => {
        return (
            <div className='valueContainer'>
                <span className='currentValue'>{currentValue}</span>
            </div>
        )
    }

    const handleOnPressButton = (value: string): void => {

    }

    return (
        <div className='calculatorContainer center-screen'>
            <h3 className='calculatorTitle'>{showPremiumVersion ? 'Advanced' : 'Basic'}</h3>
            <div className='calculator'>
                <ValueScreen />
                <Buttons showPremiumVersion={showPremiumVersion} handleOnPress={handleOnPressButton}/>
            </div>
        </div>
    );
}

export default Calculator;