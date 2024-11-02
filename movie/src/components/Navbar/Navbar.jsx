import React, { useState } from 'react';
import './Navbar.css';
import LoginModal from '../../pages/LoginModal';
import SignupModal from '../../pages/SignupModal';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  return (
    <nav className="navbar">
      <img src="/umc_logo.png" className="logo" alt="UMC Logo" />
      <div className="auth-buttons">
        <button className="login-btn" onClick={openLoginModal}>로그인</button>
        <button className="signup-btn" onClick={openSignupModal}>회원가입</button>
      </div>
      
      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      )}

      {showSignupModal && (
        <SignupModal closeModal={() => setShowSignupModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
