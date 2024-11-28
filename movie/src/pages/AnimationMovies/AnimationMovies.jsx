import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const AnimationMovies = () => {
  return (
    <div>
      <h2>#애니메이션</h2>
      <MovieList category="animation" /> {/* API에 적절한 카테고리로 대체 */}
    </div>
  );
};

export default AnimationMovies;
