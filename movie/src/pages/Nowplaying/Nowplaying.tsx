import React from 'react';
import MovieList from '../../components/MovieList/MovieList';

const NowPlayingPage: React.FC = () => <MovieList category="now_playing" isCircular />;

export default NowPlayingPage;
