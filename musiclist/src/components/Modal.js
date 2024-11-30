import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/modalSlice';
import { clearCart } from '../features/cartSlice';

const Modal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>※ 정말로 장바구니를 비우시겠습니까?</h2>
        <ButtonContainer>
          <ModalButton
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            Yes
          </ModalButton>
          <ModalButton onClick={() => dispatch(closeModal())}>No</ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  width: 700px; 
  height: 400px;
  font-size: 25px;
  border-radius: 15px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  gap: 10px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 15px 30px; 
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px; 
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }
`;
