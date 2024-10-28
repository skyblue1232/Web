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
