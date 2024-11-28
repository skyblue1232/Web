import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartList = () => {
  const filteredItems = useSelector((state) => state.cart.filteredItems); // Redux 상태에서 가져오기
  const items = useSelector((state) => state.cart.items);

  console.log('[Component] Rendered CartList:', { items, filteredItems });
  
  if (items.length === 0) {
    return (
      <ListContainer>
        <EmptyCartMessage>장바구니가 비어있습니다. 음반을 추가해주세요.</EmptyCartMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => 
        <CartItem key={item.id} {...item} />)
      ) : (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </ListContainer>
  );
};

export default CartList;

const ListContainer = styled.div`
  padding: 20px;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #555;
  font-size: 20px;
  margin-top: 30px;
`;

const NoResults = styled.p`
  text-align: center;
  color: #888;
  font-size: 18px;
`;