import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { CartIcon } from '../constants/icons';
import useCartStore from '../features/cartSlice'; // Zustand store import

const Header = () => {
  const totalAmount = useCartStore((state) => state.totalAmount); // Zustand 상태 사용

  console.log('totalAmount:', totalAmount);

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
