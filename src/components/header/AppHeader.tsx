import React from 'react';
import './AppHeader.css';

interface AppHeaderProps {
    onClickGoPremiumBtn: () => void,
    onLogout: () => void,
    showPremiumVersion: boolean
}

const AppHeader = ({onClickGoPremiumBtn, showPremiumVersion, onLogout} : AppHeaderProps) => {
    return (
        <div className='header'>
            <button className={`goPremiumBtn invisible`}>Go Premium</button>
            <h2 className='appTitle'>WEB CALCULATOR</h2>
            {!showPremiumVersion && <button className={'goPremiumBtn'} onClick={onClickGoPremiumBtn}>Go Premium</button>}
            {showPremiumVersion && <button onClick={onLogout}>Logout</button>}
        </div>
    )
}

export default AppHeader;