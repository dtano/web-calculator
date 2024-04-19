import React from 'react';
import './AppHeader.css';

const AppHeader = () => {
    return (
        <div className='header'>
            <button className={`goPremiumBtn invisible`}>Go Premium</button>
            <h2 className='appTitle'>WEB CALCULATOR</h2>
            <button className='goPremiumBtn'>Go Premium</button>
        </div>
    )
}

export default AppHeader;