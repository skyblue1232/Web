import styled from 'styled-components';

export const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const Message = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.2em;
  color: #666;
`;

export const LoadMoreContainer = styled.div`
  grid-column: 1 / -1; /* 첫 번째부터 마지막까지 전체 열을 차지 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px; 
  margin: 20px 0 20px 10px; /* top right bottom left */
`;

export const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #009843;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007a3a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PageIndicator = styled.span`
  font-size: 16px;
  color: #666;
  margin: 0 10px;
`;
