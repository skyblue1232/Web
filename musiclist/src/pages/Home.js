import React from 'react';
import Header from '../components/Header';
import CartList from '../components/CartList';
import CartSummary from '../components/CartSummary';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <HomeContainer>
      <CartButton onClick={goToCart}>
        🛒장바구니
      </CartButton>
    </HomeContainer>
      <CartList />
      <CartSummary />
      <Footer />
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  text-align: center;
  margin-top: 5px;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const CartButton = styled.button`
  position: fixed; /* 화면에 고정 */
  top: 10px; /* 상단에서 10px 떨어짐 */
  right: 10px; /* 오른쪽에서 10px 떨어짐 */
  background-color: #87cefa; /* 기본 배경색 */
  color: white;
  font-size: 18px;
  margin-top: 75px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4682b4; /* 호버 시 배경색 변경 */
  }

  z-index: 1000; /* 다른 요소 위에 표시 */
`;
