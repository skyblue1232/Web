import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
// import Slider from 'react-slick';
import * as S from './Styles';
import { useNavigate } from 'react-router-dom'; 

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['추천', '#왓챠의 발견', '#한국', '#애니메이션', '성인+'];
  const categoryRoutes = ['recommend', 'watcha-discovery', 'korea', 'animation', 'adult']; 
  const validCategories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
  const selectedCategory = validCategories.includes(category) ? category : 'popular';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const url = `https://api.themoviedb.org/3/movie/${selectedCategory}?language=ko-KR`;
      console.log('Fetching movies from:', url);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTcyOTgyNzc1Ny43NTc4MTEsInN1YiI6IjY3MWIxMDk2NDU0MmUzNzFmZTBhNzA1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuHMEBUdesbPDjTBxtndzV4CJAziDVnlvH0v44-2OLM',
          },
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status}`);
        }

        const data = await response.json();
        console.log('Movie data:', data);
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  const handleCategoryClick = (index) => {
    const route = categoryRoutes[index]; // 카테고리의 라우트를 가져옴
    navigate(`/${route}`); // 해당 경로로 이동
  };

  // // 슬라이더 설정
  // const sliderSettings = {
  //   dots: true, // 하단 점 표시
  //   infinite: true, // 무한 루프
  //   speed: 500, // 슬라이드 전환 속도
  //   slidesToShow: 1, // 한 번에 한 슬라이드만 표시
  //   slidesToScroll: 1, // 한 번에 하나씩 넘김
  //   arrows: false, // 좌우 화살표 표시
  //   draggable: true, // 드래그로 슬라이드 가능
  //   swipe: true, // 스와이프 기능 활성화
  //   vertical: false, // 수직 슬라이드 비활성화 (중요)
  //   responsive: [
  //     {
  //       breakpoint: 1024, // 화면 너비 1024px 이하
  //       settings: {
  //         slidesToShow: 2, // 2개 표시
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768, // 화면 너비 768px 이하
  //       settings: {
  //         slidesToShow: 1, // 1개 표시
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };


  return (
    <div>
      <S.CategoryButtons>
        {categories.map((cat, index) => (
          <S.CategoryButton key={index} onClick={() => handleCategoryClick(index)}>{cat}</S.CategoryButton>
        ))}
      </S.CategoryButtons>
      
      <S.RecommendSection>
        <h2>추천</h2>
        {/* <Slider {...sliderSettings}>
          {movies.map((movie) => (
            <S.SliderItem key={movie.id}>
              <S.SliderImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <S.MovieTitle>{movie.title}</S.MovieTitle>
            </S.SliderItem>
          ))}
        </Slider> */}
      </S.RecommendSection>

      <S.MovieListContainer>
        {loading ? (
          <S.Message>Loading...</S.Message>
        ) : error ? (
          <S.Message>Error: {error}</S.Message>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <S.Message>No movies found.</S.Message>
        )}
      </S.MovieListContainer>
    </div>
  );
};

export default MovieList;
