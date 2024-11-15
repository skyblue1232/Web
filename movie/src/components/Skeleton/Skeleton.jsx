import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 500px; 
  background-color: #e0e0e0; 
  border-radius: 8px;
  margin: 10px 0;
  animation: shimmer 1.5s infinite linear;

  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }
`;

const Skeleton = () => {
  return <SkeletonWrapper />;
};

export default Skeleton;
