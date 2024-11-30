import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCartStore from '../features/cartSlice'; // Redux 대신 Zustand 사용
import useModalStore from '../features/modalSlice';

const CartSummary = () => {
  const { totalAmount, totalPrice, calculateTotals } = useCartStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <SummaryContainer>
      <SummaryDetails>
        <h2>Cart Summary</h2>
        <p>Total Items: {totalAmount}</p>
        <p>Total Price: ₩{totalPrice}</p>
        <ClearButton onClick={openModal}>Clear Cart</ClearButton>
      </SummaryDetails>
    </SummaryContainer>
  );
};

export default CartSummary;

const SummaryContainer = styled.div`
  position: fixed;
  bottom: 50px; /* Footer 위에 고정 */
  left: 0;
  width: 100%;
  background-color: #87cefa;
  padding: 15px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10; /* Footer보다 위에 렌더링 */
`;

const SummaryDetails = styled.div`
  font-size: 16px;
  color: white;

  p {
    margin: 0;
  }
`;

const ClearButton = styled.button`
  background-color: #568203; /* 아보카도 녹색 */
  color: white;
  border: 2px solid orange; /* 주황색 테두리 */
  border-radius: 6px; /* 살짝 둥근 사각형 */
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6b8e23; /* 올리브 느낌의 초록색 */
  }

  &:active {
    background-color: #3b5e20; /* 더 진한 아보카도색 */
  }
`;


