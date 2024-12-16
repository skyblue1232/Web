import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
`;

export const MovieCard = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover .info {
    opacity: 1;
  }
`;

export const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;

  ${MovieCard}:hover & {
    transform: scale(1.05);
  }
`;

export const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%; /* 포스터 전체 높이로 설정 */
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6); 
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단 정렬 */
  transition: opacity 0.3s ease;
  overflow-y: auto;
  text-align: left;
  font-size: 0.9em;
  line-height: 1.4;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Title = styled.h3`
  font-size: 1.1em;
  margin-bottom: 8px;
  font-weight: bold;
  color: #ffffff;
`;

export const Description = styled.p`
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.8); 
  line-height: 1.5;
  margin: 0;
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f3f3f3 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
`;
