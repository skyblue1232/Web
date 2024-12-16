import React, { FC } from 'react';
import * as S from './Styles';

const DEFAULT_POSTER = 'https://via.placeholder.com/500x750?text=No+Image';

// Movie 타입 정의
interface Movie {
  poster_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

// Props 타입 정의
interface MovieCardProps {
  movie: Movie;
  isCircular?: boolean; // 선택적 props 추가
}

const MovieCard: FC<MovieCardProps> = ({ movie, isCircular = false }) => {
  return (
    <S.Card>
      <S.Poster
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : DEFAULT_POSTER
        }
        alt={movie.title || 'No image available'}
        isCircular={isCircular} // 동적 스타일링 적용
      />
      <S.Info>
        <S.Title>{movie.title}</S.Title>
        <S.Content>
          <S.Overview>{movie.overview}</S.Overview>
          <S.ReleaseDate>Release Date: {movie.release_date}</S.ReleaseDate>
          <S.Rating>Rating: {movie.vote_average.toFixed(1)}</S.Rating>
        </S.Content>
      </S.Info>
    </S.Card>
  );
};

export default MovieCard;
