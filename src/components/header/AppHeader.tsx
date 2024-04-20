import React from 'react';
import './AppHeader.css';

interface AppHeaderProps {
    onClickGoPremiumBtn: () => void,
    showPremiumVersion: boolean
}

const AppHeader = ({onClickGoPremiumBtn, showPremiumVersion} : AppHeaderProps) => {
    return (
        <div className='header'>
            <button className={`goPremiumBtn invisible`}>Go Premium</button>
            <h2 className='appTitle'>WEB CALCULATOR</h2>
            <button className={`goPremiumBtn ${showPremiumVersion ? 'invisible' : ''}`} onClick={onClickGoPremiumBtn}>Go Premium</button>
        </div>
    )
}

export default AppHeader;