import styled from 'styled-components';

// 영화 리스트 전체 래퍼
export const MovieListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 45px;
  gap: 45px;
  justify-content: left;
`;

// 영화 리스트 컨테이너
export const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

// 메시지 스타일
export const Message = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.2em;
  color: #666;
`;

// 둥근 버튼 섹션
export const CategoryButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

export const CategoryButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #ff2e63;
  margin-left:10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e02150;
  }
`;

// 추천 섹션
export const RecommendSection = styled.div`
  margin-bottom: 40px;

  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5em;
    font-weight: bold;
  }
`;

// 슬라이더 아이템
export const SliderItem = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 수직 정렬 */
  overflow: hidden;
  padding: 20px; /* 여백 추가 */
`;

// 슬라이더 이미지
export const SliderImage = styled.img`
  width: 300px; /* 포스터 가로 크기 */
  height: 450px; /* 포스터 세로 크기 */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05); /* 호버 시 확대 효과 */
  }
`;

export const MovieTitle = styled.p`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;
