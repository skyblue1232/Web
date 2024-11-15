const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTczMTYwNTI4Mi45NTIyNDQzLCJzdWIiOiI2NzFiMTA5NjQ1NDJlMzcxZmUwYTcwNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2T2ejp_isi3G21fdpQfxCEO5jkZTkJh7kGZZgwzAJlI';

export const fetchMoviesByCategory = async (category) => {
  const validCategories = ['now_playing', 'popular', 'upcoming', 'top_rated'];
  if (!validCategories.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const url = `${BASE_URL}/movie/${category}?language=en-US&page=1`;

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

  const data = await response.json();
  console.log('Fetched data:', data); 
  return data.results || [];
};

