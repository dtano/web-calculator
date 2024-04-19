import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [showPremiumVersion, setShowPremiumVersion] = useState(false);
    const [currentValue, setCurrentValue] = useState("0");

    const ValueScreen = () => {
        return (
            <div className='valueContainer'>
                <span className='currentValue'>{currentValue}</span>
            </div>
        )
    }

    const ButtonsContainer = () => {
        const MemoryButtons = () => {
            return (
                <div>

                </div>
            )
        }

        return (
            <div className='buttonsContainer'>
                {showPremiumVersion && <MemoryButtons />}
                {/* Core buttons will be rendered here */}
            </div>
        );
    }

    return (
        <div className='calculator'>
            <ValueScreen />
            <ButtonsContainer />
        </div>
    );
}

export default Calculator;