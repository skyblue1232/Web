import React from 'react';
import styled from 'styled-components';
import useCartStore from '../features/cartSlice';

const CartItem = ({ id, title, singer, price, img }) => {
  const { items, increase, decrease, calculateTotals } = useCartStore();

  const amount = items.find((item) => item.id === id)?.amount || 0;

  const handleIncrease = () => {
    increase(id);
    calculateTotals();
    console.log('[Zustand] Updated State:', useCartStore.getState());
  };

  const handleDecrease = () => {
    if (amount > 1) {
      decrease(id); // 수량 감소
      calculateTotals(); // 총합 계산
      console.log('[Zustand] Updated State:', useCartStore.getState());
    } else {
      console.log(`[Zustand] Cannot decrease. Minimum amount reached for ${id}`);
    }
  };

  return (
    <ItemContainer>
      <ItemImage src={img} alt={title} />
      <ItemDetails>
        <h3>{title}</h3>
        <p>{singer}</p>
        <p>₩{price}</p>
        <CounterContainer>
          <ActionButton onClick={handleDecrease}>-</ActionButton>
          <ItemCount>{amount}</ItemCount>
          <ActionButton onClick={handleIncrease}>+</ActionButton>
        </CounterContainer>
      </ItemDetails>
    </ItemContainer>
  );
};

export default CartItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 20px;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: #87cefa;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4682b4;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ItemCount = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding: 0 5px;
`;
