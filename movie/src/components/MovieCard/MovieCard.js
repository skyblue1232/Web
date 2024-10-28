import React from 'react';
import * as S from './Styles';

const MovieCard = ({ movie }) => {
  return (
    <S.Card>
      <S.Poster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <S.Info>
        <S.Title>{movie.title}</S.Title>
        <S.Content>
          <S.Overview>{movie.overview}</S.Overview>
          <S.ReleaseDate>Release Date: {movie.release_date}</S.ReleaseDate>
          <S.Rating>Rating: {movie.vote_average}</S.Rating>
        </S.Content>
      </S.Info>
    </S.Card>
  );
};

export default MovieCard;
