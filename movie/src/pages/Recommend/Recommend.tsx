import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const Recommend: React.FC = () => {
  return (
    <div>
      <h2>추천</h2>
      <MovieList category="popular" />
    </div>
  );
};

export default Recommend;
