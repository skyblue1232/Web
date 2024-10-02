import React, { useState, useEffect } from 'react';
import { MOVIES } from './mocks/movie';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(MOVIES.results); // API 데이터 세팅
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;