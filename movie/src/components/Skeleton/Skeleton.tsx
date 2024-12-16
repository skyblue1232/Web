import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 10px 0;
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 1000px 100%;

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;

const Skeleton: React.FC = () => {
  return <SkeletonWrapper />;
};

export default Skeleton;
