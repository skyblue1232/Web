import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #009843;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoginSpinner = () => {
  return <Spinner />;
};

export default LoginSpinner;
