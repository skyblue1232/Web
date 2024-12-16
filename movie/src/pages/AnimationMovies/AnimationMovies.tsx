import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const AnimationMovies: React.FC = () => {
  return (
    <div>
      <h2>#애니메이션</h2>
      <MovieList category="animation" />
    </div>
  );
};

export default AnimationMovies;
