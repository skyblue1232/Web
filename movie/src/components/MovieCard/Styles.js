import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: black;
`;

export const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Info = styled.div` 
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 120px; /* 스크롤 가능 높이 */
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Overview = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

export const ReleaseDate = styled.p`
  font-size: 12px;
  color: #888;
  margin: 5px 0;
`;

export const Rating = styled.p`
  font-size: 12px;
  color: #888;
  margin: 5px 0;
`;
