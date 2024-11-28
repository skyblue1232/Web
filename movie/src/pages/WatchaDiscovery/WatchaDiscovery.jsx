import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import * as S from './WatchaDiscoveryStyles';

const WatchaDiscovery = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTcyOTgyNzc1Ny43NTc4MTEsInN1YiI6IjY3MWIxMDk2NDU0MmUzNzFmZTBhNzA1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuHMEBUdesbPDjTBxtndzV4CJAziDVnlvH0v44-2OLM',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching movies: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results.slice(0, 20)); // 상위 20개 영화만 가져옴
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // 한 번에 5개의 영화 표시
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2>#왓챠의 발견</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <Slider {...sliderSettings}>
          {movies.map((movie, index) => (
            <S.SliderItem key={movie.id}>
              <S.MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <S.MovieInfo>
                <S.MovieRank>{index + 1}위</S.MovieRank>
                <S.MovieTitle>{movie.title}</S.MovieTitle>
              </S.MovieInfo>
            </S.SliderItem>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default WatchaDiscovery;
