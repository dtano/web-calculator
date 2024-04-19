import React, { useState } from 'react';
import './Calculator.css';
import Buttons from './Buttons';
import { ADDITION, BACK_SPACE, CHANGE_SIGN, CLEAR_ALL, CLEAR_ENTRY, DECIMAL, DIVISION, EQUALS, FRACTION, MULTIPLICATION, PERCENTAGE, SQUARED, SQUARE_ROOT, SUBTRACTION } from '../../constants/operators';

interface CalculatorProps {
    showPremiumVersion: boolean
}

const DEFAULT_VALUE = '0';

const Calculator = ({showPremiumVersion} : CalculatorProps) => {
    const [currentValue, setCurrentValue] = useState(DEFAULT_VALUE);
    const [previousValue, setPreviousValue] = useState(DEFAULT_VALUE);
    const [hasError, setHasError] = useState(false);

    const ValueScreen = () => {
        return (
            <div className='valueContainer'>
                <span className='currentValue'>{currentValue}</span>
            </div>
        )
    }

    const addNumberToCurrentValue = (num: string) => {
        setCurrentValue(prev => {
            if(!prev || (prev === DEFAULT_VALUE && num !== DECIMAL)){
                return num;
            }

            return prev + num;
        });
    }

    const handleSymbol = (symbol: string) => {
        switch(symbol) {
            case CLEAR_ALL:
                clearAll();
                break;
            case CLEAR_ENTRY:
                setPreviousValue(DEFAULT_VALUE);
                break;
            case BACK_SPACE:
                triggerBackSpace();
                break;
            case ADDITION:
            case SUBTRACTION:
            case DIVISION:
            case MULTIPLICATION:
                // So when a mathematical operator is clicked, we want to still show the current value
                // Once the user clicks a number or decimal point, the value shown will be the new value
                break;
            case DECIMAL:
                // Check if the current input has a decimal or not
                if(!currentValue?.includes(DECIMAL)){
                    addNumberToCurrentValue(DECIMAL);
                }
                break;
            case SQUARED:
            case SQUARE_ROOT:
            case FRACTION:
                break;
            case PERCENTAGE:
                break;
            case EQUALS:
                break;
            case CHANGE_SIGN:
                break;
        }
    }
    
    const clearAll = () => {
        setCurrentValue(DEFAULT_VALUE);
    }

    const triggerBackSpace = () => {
        // Get the latest index
        if(!currentValue || currentValue === DEFAULT_VALUE) return;

        setCurrentValue(prev => {
            if(prev.length === 1){
                return '0';
            }
            return prev.slice(0, -1);
        });
    }

    const handleOnPressButton = (value: string): void => {
        // Find out what the given value is
        const numberValue = parseInt(value);
        if(Number.isNaN(numberValue)){
            handleSymbol(value);
        } else{
            // If its a number then add it to the currentValue
            addNumberToCurrentValue(value);
        }
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