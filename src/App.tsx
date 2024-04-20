import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import Calculator from './components/calculator/Calculator';
import SignUpModal from './components/SignUpModal/SignUpModal';

const App = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPremiumVersion, setShowPremiumVersion] = useState(false);

  const onClickGoPremiumBtn = () => {
    console.log("Clicking go premium");
    if(!showSignUpModal){
      console.log("Set to true");
      setShowSignUpModal(true);
    }
  }

  return (
    <div className="App">
      <AppHeader onClickGoPremiumBtn={onClickGoPremiumBtn} showPremiumVersion={showPremiumVersion}/>
      <Calculator showPremiumVersion={showPremiumVersion}/>
      {!!showSignUpModal && <SignUpModal setIsOpen={setShowSignUpModal}/>}
    </div>
  );
}

export default App;
