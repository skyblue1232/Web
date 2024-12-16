import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const LatestGood: React.FC = () => <MovieList category="top_rated" isCircular />;

export default LatestGood;
