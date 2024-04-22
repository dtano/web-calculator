import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import Calculator from './components/calculator/Calculator';
import GoPremiumModal from './components/SignUpModal/GoPremiumModal';

const App = () => {
  const [showGoPremiumModal, setShowGoPremiumModal] = useState(false);
  const [showPremiumVersion, setShowPremiumVersion] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(!!user){
      setShowPremiumVersion(true);
    }else{
      setShowPremiumVersion(false);
    }
  }, []);

  const onClickGoPremiumBtn = () => {
    if(!showGoPremiumModal){
      setShowGoPremiumModal(true);
    }
  }

  const onSuccessfulLogin = (jwtToken: string) => {
    console.log("SUCCESS LOGIN!");
    localStorage.setItem('user', jwtToken);
    setShowPremiumVersion(true);
    setShowGoPremiumModal(false);
  }

  const onLogout = () => {
    localStorage.removeItem('user');

    setShowPremiumVersion(false);
  }

  return (
    <div className="App">
      <AppHeader onClickGoPremiumBtn={onClickGoPremiumBtn} showPremiumVersion={showPremiumVersion} onLogout={onLogout}/>
      <Calculator showPremiumVersion={showPremiumVersion}/>
      {!!showGoPremiumModal && <GoPremiumModal setIsOpen={setShowGoPremiumModal} onSuccessfulLogin={onSuccessfulLogin}/>}
    </div>
  );
}

export default App;
