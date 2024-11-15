import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from '../MovieCard/MovieCard';
import Skeleton from '../Skeleton/Skeleton';
import * as S from './Styles';
import { fetchMoviesByCategory } from '../../api/movies';
import LoginSpinner from '../LoginSpinner';

const MovieList = ({ category, isCircular = false }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', category],
    queryFn: ({ pageParam = 1 }) => fetchMoviesByCategory(category, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleNextPage = () => {
    if (currentPageIndex === (data?.pages.length || 0) - 1) {
      fetchNextPage();
    }
    setCurrentPageIndex((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentPageData = data?.pages[currentPageIndex]?.results || [];

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
        <S.LoadMoreButton onClick={handleNextPage} disabled={!hasNextPage && currentPageIndex === (data?.pages.length || 0) - 1}>
          {isFetchingNextPage ? 'Loading more...' : '다음'}
        </S.LoadMoreButton>
        {isFetchingNextPage && <LoginSpinner />}
      </S.LoadMoreContainer>
    </S.MovieListContainer>
  );
};

export default MovieList;
