import React, { useEffect, useState } from 'react';
import styles from './Calculator.module.css';
import Buttons from './Buttons';
import { ADDITION, BACK_SPACE, CHANGE_SIGN, CLEAR_ALL, CLEAR_ENTRY, DECIMAL_POINT, DIVISION, EQUALS, FRACTION, MEMORY_ADD, MEMORY_CLEAR, MEMORY_RECALL, MEMORY_STORE, MEMORY_SUBTRACT, MULTIPLICATION, PERCENTAGE, SQUARED, SQUARE_ROOT, SUBTRACTION, isMemoryFunction } from '../../constants/operators';

interface CalculatorProps {
    showPremiumVersion: boolean
}

const DEFAULT_VALUE = '0';

const Calculator = ({showPremiumVersion} : CalculatorProps) => {
    const [displayedValue, setDisplayedValue] = useState<string>(DEFAULT_VALUE);
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [previousSymbol, setPreviousSymbol] = useState<string | null>(null);
    const [showPreviousValue, setShowPreviousValue] = useState(false);
    const [isEqualSignPressed, setIsEqualSignPressed] = useState(false);
    const [isMemoryButtonPressed, setIsMemoryButtonPressed] = useState(false);

    // Memory states here
    const [memoryRegister, setMemoryRegister] = useState<number | null>(null);

    useEffect(() => {
        clearAll();
        clearMemory();
    }, [showPremiumVersion])

    const ValueScreen = () => {
        return (
            <div className={styles.valueContainer}>
                <span className={styles.currentValue}>{!hasError ? (showPreviousValue ? previousValue : displayedValue) : 'Error'}</span>
            </div>
        )
    }

    const determineDisplayedValue = (num: string) => {
        setDisplayedValue(prev => {
            if(!prev || (prev === DEFAULT_VALUE && num !== DECIMAL_POINT) || (isEqualSignPressed && displayedValue?.charAt(1) !== '.') || isMemoryButtonPressed){
                if(num === DECIMAL_POINT){
                    return `0${num}`;
                }

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
            case BACK_SPACE:
                triggerBackSpace();
                break;
            case DECIMAL_POINT:
                // Check if the current input has a decimal or not
                if(!displayedValue?.includes(DECIMAL_POINT)){
                    determineDisplayedValue(DECIMAL_POINT);
                }
                break;
            case EQUALS:
                setIsEqualSignPressed(true);
                if(!displayedValue || !previousSymbol){
                    return;
                }

                if(displayedValue === '0' && previousSymbol === DIVISION){
                    setHasError(true);
                    return;
                }

                const finalTotal = calculate(parseFloat(displayedValue), total, previousSymbol);
                setDisplayedValue(finalTotal.toString());
                setPreviousSymbol(null);
                break;
            case PERCENTAGE:
            case CHANGE_SIGN:
            case SQUARED:
            case SQUARE_ROOT:
            case FRACTION:
                if(!displayedValue) return;

                const changedValue = calculate(total, parseFloat(displayedValue), symbol);
                setDisplayedValue(changedValue.toString());
                break;
            default:
                if(isMemoryFunction(symbol)){
                    handleMemoryFunctions(symbol);
                    return;
                }
                
                // If previous symbol is null, then we need to set the total using currentValue
                // Try and make this logic clearer
                if(!displayedValue || displayedValue === DEFAULT_VALUE || !previousSymbol){
                    if(!previousSymbol){
                        setTotal(parseFloat(displayedValue));
                        prepareNextOperation(symbol);
                    }
                    return;
                }
                
                if(!!previousSymbol){
                    const previousOperationValue = calculate(parseFloat(displayedValue), total, previousSymbol);

                    setTotal(previousOperationValue);
                    setDisplayedValue(previousOperationValue.toString());
                    prepareNextOperation(symbol, previousOperationValue.toString());
                }else{
                    const calculatedValue = calculate(total, parseFloat(displayedValue), symbol);
                    setTotal(calculatedValue);
                    prepareNextOperation(symbol);
                }
                
                break;
        }
    }

    const handleMemoryFunctions = (func: string) => {
        switch(func){
            case MEMORY_CLEAR:
                setMemoryRegister(null);
                break;
            case MEMORY_RECALL:
                setDisplayedValue(!!memoryRegister ? memoryRegister.toString() : '0');
                break;
            case MEMORY_STORE:
                setMemoryRegister(parseFloat(displayedValue))
                break;
            case MEMORY_ADD:
                setMemoryRegister(prev => (prev ?? 0) + parseFloat(displayedValue));
                break;
            case MEMORY_SUBTRACT:
                setMemoryRegister(prev => (prev ?? 0) - parseFloat(displayedValue));
                break;
            
        }

        setIsMemoryButtonPressed(true);
    }

    const prepareNextOperation = (symbol: string, newPreviousValue: string = displayedValue) => {
        setPreviousSymbol(symbol);
        setPreviousValue(newPreviousValue);
        setDisplayedValue(DEFAULT_VALUE);
        setShowPreviousValue(true);
    }

    // Rename n1 and n2 to clearer names
    const calculate = (n1: number, n2: number, operator: string) : number => {
        switch(operator){
            case ADDITION:
                return n1 + n2;
            case SUBTRACTION:
                return n2 - n1;
            case MULTIPLICATION:
                return n1 * n2;
            case DIVISION:
                return n2/n1;
            case PERCENTAGE:
                return n2/100;
            case CHANGE_SIGN:
                return n2 * -1;
            case SQUARED:
                return n2 * n2;
            case SQUARE_ROOT:
                return Math.sqrt(n2);
            case FRACTION:
                return 1/n2;
        }

        return 0;
    }
    
    const clearAll = () => {
        setDisplayedValue(DEFAULT_VALUE);
        setTotal(0);
        setPreviousSymbol(null);
        setHasError(false);
        setPreviousValue(null);
    }

    const clearMemory = () => {
        setMemoryRegister(null);
        setIsMemoryButtonPressed(false);
    }

    const triggerBackSpace = () => {
        if(!displayedValue || displayedValue === DEFAULT_VALUE) return;

        setDisplayedValue(prev => {
            if(prev.length === 1){
                return '0';
            }
            return prev.slice(0, -1);
        });
    }

    const handleOnPressButton = (value: string): void => {
        // Once a new button is pressed and an old value is being shown, then make sure the old value isn't shown again
        if(showPreviousValue){
            setShowPreviousValue(false);
        }

        // Find out what the given value is
        const numberValue = parseInt(value);
        if(Number.isNaN(numberValue) || value === FRACTION){
            handleSymbol(value);
        } else{
            // If its a number then add it to the currentValue
            determineDisplayedValue(value);
            if(isEqualSignPressed){
                setTotal(0);
            }
        }

        if (value !== EQUALS) {
            setIsEqualSignPressed(
              (value === CHANGE_SIGN && isEqualSignPressed) ||
                value === PERCENTAGE ||
                (value === DECIMAL_POINT && isEqualSignPressed)
            );
        }

        if(isMemoryButtonPressed && !isMemoryFunction(value)){
            setIsMemoryButtonPressed(false);
        }
    }

    return (
        <div className={`${styles.calculatorContainer} center-screen`}>
            <h3 className={styles.calculatorTitle}>{showPremiumVersion ? 'Advanced' : 'Basic'}</h3>
            <div className={styles.calculator}>
                <ValueScreen />
                <Buttons showPremiumVersion={showPremiumVersion} handleOnPress={handleOnPressButton} isMemoryActive={!!memoryRegister}/>
            </div>
        </div>
    );
}

export default Calculator;