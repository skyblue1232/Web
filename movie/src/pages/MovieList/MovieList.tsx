import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import * as S from './Styles';
import { useNavigate } from 'react-router-dom';

// 영화 타입 정의
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

// Props 타입 정의
interface MovieListProps {
  category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
}

const MovieList: React.FC<MovieListProps> = ({ category }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories: string[] = ['추천', '#왓챠의 발견', '#한국', '#애니메이션', '성인+'];
  const categoryRoutes: string[] = ['recommend', 'watcha-discovery', 'korea', 'animation', 'adult'];
  const validCategories: string[] = ['now_playing', 'popular', 'top_rated', 'upcoming'];
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
        setError((error as Error).message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = (index: number) => {
    const route = categoryRoutes[index];
    navigate(`/${route}`);
  };

  return (
    <div>
      <S.CategoryButtons>
        {categories.map((cat, index) => (
          <S.CategoryButton key={index} onClick={() => handleCategoryClick(index)}>
            {cat}
          </S.CategoryButton>
        ))}
      </S.CategoryButtons>

      <S.RecommendSection>
        <h2>추천</h2>
        {/* 추천 섹션 로직을 추가할 수 있습니다 */}
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
