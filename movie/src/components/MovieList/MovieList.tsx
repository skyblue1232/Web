import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from '../MovieCard/MovieCard';
import Skeleton from '../Skeleton/Skeleton';
import * as S from './Styles';
import { fetchMoviesByCategory } from '../../api/movies';
import LoginSpinner from '../LoginSpinner';

// Movie 타입 정의
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

// API 반환 타입 정의
interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

// 카테고리 상수와 타입 정의
export const MOVIE_CATEGORIES = ['now_playing', 'popular', 'upcoming', 'top_rated', 'animation', 'korea'] as const;

export type MovieCategory = typeof MOVIE_CATEGORIES[number];

// Props 타입 정의
interface MovieListProps {
  category: MovieCategory;
  isCircular?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ category, isCircular = false }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // React Query - 무한 스크롤 설정
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MoviesApiResponse>({
    queryKey: ['movies', category],
    queryFn: ({ pageParam = 1 }) => fetchMoviesByCategory(category, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });

  // 다음 페이지 핸들러
  const handleNextPage = () => {
    if (currentPageIndex === (data?.pages.length || 0) - 1 && hasNextPage) {
      fetchNextPage();
    }
    setCurrentPageIndex((prev) => prev + 1);
  };

  // 이전 페이지 핸들러
  const handlePreviousPage = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  // 현재 페이지 데이터
  const currentPageData = data?.pages?.[currentPageIndex]?.results || [];

  return (
    <S.MovieListContainer>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : error ? (
        <S.Message>Error: {error.message}</S.Message>
      ) : currentPageData.length > 0 ? (
        currentPageData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isCircular={isCircular} />
        ))
      ) : (
        <S.Message>No movies found.</S.Message>
      )}
      <S.LoadMoreContainer>
        <S.LoadMoreButton onClick={handlePreviousPage} disabled={currentPageIndex === 0}>
          이전
        </S.LoadMoreButton>
        <S.PageIndicator>Page {currentPageIndex + 1}</S.PageIndicator>
        <S.LoadMoreButton
          onClick={handleNextPage}
          disabled={!hasNextPage && currentPageIndex === (data?.pages.length || 0) - 1}
        >
          {isFetchingNextPage ? 'Loading more...' : '다음'}
        </S.LoadMoreButton>
        {isFetchingNextPage && <LoginSpinner />}
      </S.LoadMoreContainer>
    </S.MovieListContainer>
  );
};

export default MovieList;
