import React, { useEffect, useState } from 'react';
import './Navbar.css';
import LoginModal from '../../pages/LoginModal';
import SignupModal from '../../pages/SignupModal';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 유저 정보 상태
  const navigate = useNavigate();

  // 유저 정보 불러오기 함수
  const fetchUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const email = response.data.email;
        const nickname = email.split('@')[0]; // 이메일 앞부분을 닉네임으로 사용
        setUserInfo(nickname);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
        setUserInfo(null);
      }
    }
  };

  // 컴포넌트 마운트 시 유저 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserInfo(null);
    navigate('/');
  };

  const openLoginModal = () => setShowLoginModal(true);
  const openSignupModal = () => setShowSignupModal(true);

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    setShowLoginModal(false); // 로그인 모달 닫기
    fetchUserInfo(); // 로그인 후 유저 정보 다시 불러오기
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img src="/umc_logo.png" className="logo" alt="UMC Logo" />

      <div className="auth-buttons">
        {userInfo ? (
          <>
            <span className="user-info">안녕하세요, {userInfo}님</span>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={openLoginModal}>로그인</button>
            <button className="signup-btn" onClick={openSignupModal}>회원가입</button>
          </>
        )}
      </div>

      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />
      )}
      {showSignupModal && (
        <SignupModal closeModal={() => setShowSignupModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
