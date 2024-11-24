import styled, { keyframes } from "styled-components";

export const TodoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    border: 2px solid lightgrey; 
    padding: 10px;
    margin-left: 5px;
    border-radius: 5px;
    font-size: 16px;
  }

  input:nth-of-type(1):focus {
    outline: none;
    border-color: #1e90ff; 
    box-shadow: 0 0 5px rgba(33, 136, 56, 0.5);
  }

  input:nth-of-type(2):focus {
    outline: none;
    border-color: #218838; 
    box-shadow: 0 0 5px rgba(33, 136, 56, 0.5);
  }

  button {
    padding: 5px;
    background-color: #28a745; 
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #218838;
    }
  }
`;

export const TodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TodoItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd; 
  border-radius: 5px; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  gap: 20px; 
  margin-bottom: 10px;
  background-color: #ffffff;
`;

export const TodoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .titleWrapper,
  .contentWrapper {
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
    max-width: 150px; 
  }

  .titleWrapper {
    border: 1px solid #1e90ff; 
  }

  .contentWrapper {
    border: 1px solid #218838;
  }
`;



export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  transform: scale(1); /* 체크박스 크기 원래 크기로 복원 */
  margin-right: 10px; /* 텍스트와 간격 추가 */
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 오른쪽 정렬 */
  button {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    background-color: #28a745;
    color: white;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color:  #1e7e34; /* 호버 시 버튼 색상 변경 */
  }
`;

export const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 5px;

  button {
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: #dc3545; 
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c82333;
    }
  }
`;

// 로딩 애니메이션
const dots = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

export const LoadingDot = styled.div`
  width: 15px; 
  height: 15px;
  background-color: #007bff;
  border-radius: 50%;
  animation: ${dots} 1s infinite ease-in-out;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const LoadingContainer = styled.div`
  gap: 20px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  font-size: 18px;
  color: #555;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 50px; 
  justify-align: flex-start;
  
  &::after,
  &::before,
  & {
    content: "";
    width: 16px; /* 점의 크기를 키움 */
    height: 16px; /* 점의 크기를 키움 */
    background-color: #007bff;
    border-radius: 50%;
    animation: ${dots} 1s infinite ease-in-out;
  }

  &::before {
    animation-delay: 0.2s;
  }

  &::after {
    animation-delay: 0.4s;
  }
`;

// 에러 동그라미와 X 스타일
export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #ff4d4f; /* 빨간색 배경 */
  position: relative;
`;

export const ErrorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 화면 위에 고정 */

  .error-text {
    font-size: 100px; /* 큰 X 크기 */
    color: #ff4d4f; /* 빨간색 */
    font-weight: bold;
  }
`;

