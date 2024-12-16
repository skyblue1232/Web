import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const KoreaMovies: React.FC = () => {
  return (
    <div>
      <h2>#한국</h2>
      <MovieList category="korea" /> 
    </div>
  );
};

export default KoreaMovies;
