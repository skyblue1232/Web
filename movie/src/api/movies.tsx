const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTczMjQ1MTIzNi43MDU1NjI2LCJzdWIiOiI2NzFiMTA5NjQ1NDJlMzcxZmUwYTcwNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G2MmlfOh1KISaCi74dwamAcaC5f7WdlN2LCIa5aftxA';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMoviesByCategory = async (
  category: 'now_playing' | 'popular' | 'upcoming' | 'top_rated' | 'animation' | 'korea',
  page: number = 1
): Promise<MovieApiResponse> => {
  const validCategories = ['now_playing', 'popular', 'upcoming', 'top_rated', 'animation', 'korea'] as const;

  if (!validCategories.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const url = `${BASE_URL}/movie/${category}?language=en-US&page=${page}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies for category: ${category} - Status: ${response.status}`);
  }

  const data: MovieApiResponse = await response.json();
  console.log('Fetched data:', data);
  return data;
};

