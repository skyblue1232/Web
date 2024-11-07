import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import * as S from './Styles'; 

const MovieList = ({ category, isCircular = false }) => { // isCircular prop 추가
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유효한 category 값 확인
  const validCategories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
  const selectedCategory = validCategories.includes(category) ? category : 'popular';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      // 요청 URL 설정
      const url = `https://api.themoviedb.org/3/movie/${selectedCategory}?language=ko-KR`;
      console.log("Fetching movies from:", url);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTcyOTgyNzc1Ny43NTc4MTEsInN1YiI6IjY3MWIxMDk2NDU0MmUzNzFmZTBhNzA1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuHMEBUdesbPDjTBxtndzV4CJAziDVnlvH0v44-2OLM',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <S.MovieListContainer>
      {loading ? (
        <S.Message>Loading...</S.Message>
      ) : error ? (
        <S.Message>Error: {error}</S.Message>
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isCircular={isCircular} /> // isCircular 전달
        ))
      ) : (
        <S.Message>No movies found.</S.Message>
      )}
    </S.MovieListContainer>
  );
};

export default MovieList;
