import styled from 'styled-components';

// 슬라이더 아이템
export const SliderItem = styled.div`
  display: flex; /* 가로 정렬 */
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 20px; /* 포스터와 정보 간 간격 */
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 영화 포스터
export const MoviePoster = styled.img`
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 10px;
`;

// 영화 정보 섹션
export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 영화 순위
export const MovieRank = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

// 영화 제목
export const MovieTitle = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  color: #555;
`;
