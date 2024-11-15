import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '../MovieCard/MovieCard';
import Skeleton from '../Skeleton/Skeleton';
import * as S from './Styles';
import { fetchMoviesByCategory } from '../../api/movies'; 

const MovieList = ({ category, isCircular = false }) => {
  const { data: movies = [], isLoading, error } = useQuery({
    queryKey: ['movies', category],               
    queryFn: () => fetchMoviesByCategory(category), 
    staleTime: 5 * 60 * 1000                       
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
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isCircular={isCircular} /> 
        ))
      ) : (
        <S.Message>No movies found.</S.Message>
      )}
    </S.MovieListContainer>
  );
};

export default MovieList;
