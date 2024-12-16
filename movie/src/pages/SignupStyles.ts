import styled from 'styled-components';

// 모달 오버레이 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(128, 128, 128, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
`;

// 모달 컨텐츠 스타일
export const ModalContent = styled.div`
  background: rgb(42, 59, 42);
  padding: 30px;
  border-radius: 12px;
  width: 350px;
  max-width: 90vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

// 입력 필드 스타일
export const InputField = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #f1f1f1;
  box-sizing: border-box;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:focus {
    background-color: #e7e7e7;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 5px;
`;

// 회원가입 버튼 스타일
export const SignupButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'pink')};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#ffb6c1')};
  }
`;

// 모달 닫기 버튼 스타일
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #333;
  }
`;
