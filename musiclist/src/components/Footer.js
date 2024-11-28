import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      © 2024 UMC Playlist. All Rights Reserved.
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  position: fixed; /* 화면 하단에 고정 */
  bottom: 0;
  left: 0;
  width: 100%; /* 화면 전체 폭 차지 */
  background-color: #87cefa;
  color: #555;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;