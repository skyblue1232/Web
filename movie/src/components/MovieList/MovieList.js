import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from '../MovieCard/MovieCard';
import Skeleton from '../Skeleton/Skeleton';
import * as S from './Styles';
import { fetchMoviesByCategory } from '../../api/movies';
import LoginSpinner from '../LoginSpinner';

const MovieList = ({ category, isCircular = false }) => {
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
    getNextPageParam: (lastPage, allPages) => {
      // 데이터가 더 있을 경우 다음 페이지로 이동
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

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
      ) : data && data.pages ? (
        data.pages
          .flatMap(page => page.results || [])
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} isCircular={isCircular} />
          ))
      ) : (
        <S.Message>No movies found.</S.Message>
      )}
      {hasNextPage && (
        <S.LoadMoreContainer>
          <S.LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </S.LoadMoreButton>
          {isFetchingNextPage && <LoginSpinner />}
        </S.LoadMoreContainer>
      )}
    </S.MovieListContainer>
  );
};

export default MovieList;
