import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const KoreaMovies = () => {
  return (
    <div>
      <h2>#한국</h2>
      <MovieList category="korea" /> {/* API에 적절한 카테고리로 대체 */}
    </div>
  );
};

export default KoreaMovies;
