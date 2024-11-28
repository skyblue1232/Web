import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease, calculateTotals } from '../features/cartSlice';

const CartItem = ({ id, title, singer, price, img }) => {
  const dispatch = useDispatch();

  // Redux 상태에서 해당 음반의 amount를 가져옴
  const amount = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)?.amount || 0
  );

  const handleIncrease = () => {
    dispatch(increase(id));
    dispatch(calculateTotals());
  };

  const handleDecrease = () => {
    dispatch(decrease(id));
    dispatch(calculateTotals());
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
