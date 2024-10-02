import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-overlay">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
