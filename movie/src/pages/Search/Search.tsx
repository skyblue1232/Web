import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as S from './SearchPageStyles'; // 스타일을 S로 가져오기

// Movie 타입 정의
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

// SearchPage 컴포넌트
const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // 상태 타입: Movie[]
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 타입: boolean
  const location = useLocation();

  // URL 쿼리 파라미터 가져오기
  const query: string | null = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 설정
        try {
          const response = await axios.get<{ results: Movie[] }>(
            'https://api.themoviedb.org/3/search/movie',
            {
              params: {
                query: query,
                include_adult: false,
                language: 'en-US',
                page: 1,
              },
              headers: {
                Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTczMTAxMzcyNC44NTU0NzkyLCJzdWIiOiI2NzFiMTA5NjQ1NDJlMzcxZmUwYTcwNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HMhvKfQ7DFUyzAaXjLW0ZPLy4zqdV0Gn3-WN8WB9yeI',
                accept: 'application/json',
              },
            }
          );
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('검색 실패:', error);
        } finally {
          setIsLoading(false); // 데이터 로드 완료 시 로딩 상태 해제
        }
      } else {
        setSearchResults([]); // query가 없을 경우 이전 검색 결과 초기화
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      {query && <h2>검색 결과: "{query}"</h2>}
      {!query && <h2>검색어를 입력해주세요.</h2>}

      {isLoading ? (
        <S.SkeletonGrid>
          {Array.from({ length: 8 }).map((_, index) => (
            <S.SkeletonCard key={index} /> // 로딩 중일 때 SkeletonCard 표시
          ))}
        </S.SkeletonGrid>
      ) : (
        <S.GridContainer>
          {query && searchResults.length === 0 && <p>검색 결과가 없습니다.</p>}
          {searchResults.map((result) => (
            <S.MovieCard key={result.id}>
              <S.Poster
                src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                alt={result.title}
              />
              <S.MovieInfo className="info">
                <S.Title>{result.title}</S.Title>
                <S.Description>{result.overview}</S.Description>
              </S.MovieInfo>
            </S.MovieCard>
          ))}
        </S.GridContainer>
      )}
    </div>
  );
};

export default SearchPage;
