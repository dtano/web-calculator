import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import Calculator from './components/calculator/Calculator';

const App = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPremiumVersion, setShowPremiumVersion] = useState(false);

  return (
    <div className="App">
      <AppHeader />
      <Calculator showPremiumVersion={showPremiumVersion}/>
    </div>
  );
}

export default App;
