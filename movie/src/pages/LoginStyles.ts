import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: rgb(147, 121, 121);
  color: black;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 90vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
  color: black;
`;

export const InputField = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #888;
    outline: none;
  }

  &.error {
    border: 1px solid #ff4d4f;
  }
`;

export const InputError = styled.input`
  border: 1px solid #ff4d4f;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 5px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'pink')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#ffb6c1')};
  }
`;

export const CloseButton = styled.button`
  margin-top: 10px;
  background: #ddd;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;

export const BodyModalOpen = styled.body`
  overflow: hidden;
`;

// 추가: 입력 필드 라벨
export const InputLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #444;
`;

// 추가: 모달 닫기 버튼 상단 위치
export const ModalCloseIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
