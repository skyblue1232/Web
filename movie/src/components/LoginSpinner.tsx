import React from 'react';
import styled, { keyframes } from 'styled-components';

// 회전 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스타일이 적용된 스피너 컴포넌트
const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #009843;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 로그인 스피너 컴포넌트
const LoginSpinner: React.FC = () => {
  return <Spinner />;
};

export default LoginSpinner;
