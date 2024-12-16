const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJkOTcxODM4OWY5MDliZmZlODk2ZGU4ZDZiZTg1ZCIsIm5iZiI6MTczMTYwNTI4Mi45NTIyNDQzLCJzdWIiOiI2NzFiMTA5NjQ1NDJlMzcxZmUwYTcwNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2T2ejp_isi3G21fdpQfxCEO5jkZTkJh7kGZZgwzAJlI';
const ACCOUNT_ID = '21590670';

// 유저 정보 타입 정의
interface UserInfo {
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
}

export const fetchCurrentUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await fetch(`${BASE_URL}/account/${ACCOUNT_ID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const data: UserInfo = await response.json();
    console.log('Fetched user info:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
