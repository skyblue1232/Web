import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from '../features/cartSlice';
import { openModal } from '../features/modalSlice';
import { useEffect } from 'react';

const CartSummary = () => {
  const { totalAmount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    console.log('[Component] Calculated Totals:', { totalAmount, totalPrice });
  }, [dispatch, totalAmount, totalPrice]);

  return (
    <SummaryContainer>
      <SummaryDetails>
        <h2>Cart Summary</h2>
        <p>Total Items: {totalAmount}</p>
        <p>Total Price: ₩{totalPrice}</p>
        <ClearButton onClick={() => dispatch(openModal())}>Clear Cart</ClearButton>
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


