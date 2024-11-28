import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>Page Not Found</p>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  color: #333;
`;
