import React, { useEffect, useState } from 'react';
import './Navbar.css';
import LoginModal from '../../pages/LoginModal';
import SignupModal from '../../pages/SignupModal';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';

// 유저 정보 타입 정의
interface UserInfo {
  email: string;
}

// LoginModal과 SignupModal Props 타입 정의
interface ModalProps {
  closeModal: () => void;
}
interface LoginModalProps extends ModalProps {
  onLogin: () => void;
}

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 유저 정보 가져오는 함수
  const fetchUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await api.get<UserInfo>('/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const email = response.data.email;
        const nickname = email.split('@')[0];
        setUserInfo(nickname);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
        setUserInfo(null);
      }
    }
  };

  // 컴포넌트 마운트 시 유저 정보 가져오기
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

  // 모달 핸들러 함수
  const openLoginModal = () => setShowLoginModal(true);
  const openSignupModal = () => setShowSignupModal(true);

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    setShowLoginModal(false); // 로그인 모달 닫기
    fetchUserInfo(); // 유저 정보 다시 가져오기
    navigate('/');
  };

  // 현재 페이지가 '/account'인지 확인
  const isUserDetailsPage = location.pathname === '/account';

  return (
    <nav className="navbar">
      <img src="/umc_logo.png" className="logo" alt="UMC Logo" />

      <div className="auth-buttons">
        {isUserDetailsPage ? (
          <>
            <button className="back-btn" onClick={() => navigate('/')}>
              홈으로
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : userInfo ? (
          <>
            <span className="user-info">안녕하세요, {userInfo}님</span>
            <button
              className="user-details-btn"
              onClick={() => navigate('/account')}
            >
              상세 정보
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={openLoginModal}>
              로그인
            </button>
            <button className="signup-btn" onClick={openSignupModal}>
              회원가입
            </button>
          </>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          closeModal={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
        />
      )}
      {showSignupModal && (
        <SignupModal closeModal={() => setShowSignupModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
