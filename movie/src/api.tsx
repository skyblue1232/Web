import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// 토큰 재발급 요청의 타입 설정
interface TokenResponse {
  accessToken: string;
}

// Axios Interceptor로 토큰 재발급 로직 구현
api.interceptors.response.use(
  (response: AxiosResponse) => response, // 성공적인 응답은 그대로 반환
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // 401 에러 발생 && 재시도 플래그가 없을 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // 토큰 재발급 요청
        const { data } = await axios.post<TokenResponse>(
          'http://localhost:3000/auth/token/access',
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken); // 새 토큰 저장

        // 재시도 요청에 새 액세스 토큰 추가
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest); // 요청 재시도
      } catch (err) {
        console.error('토큰 재발급 실패:', err);
        // 필요시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default api;
