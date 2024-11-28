import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { CartIcon } from '../constants/icons';
import { useSelector } from 'react-redux';

const Header = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  console.log('[Component] Header rendered with totalAmount:', totalAmount);
  
  return (
    <HeaderContainer>
      <Logo>UUUMC PlayList</Logo>
      <SearchBar /> {/* 검색창 */}
      <Cart>
        <CartIcon />
        <span>{totalAmount}</span>
      </Cart>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  background-color: #87cefa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled.h1`
  margin: 0;
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-weight: bold;
  }
`;
