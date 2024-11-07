import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Axios Interceptor로 토큰 재발급 로직 구현
api.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(
          'http://localhost:3000/auth/token/access',
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken); // 새 토큰 저장
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // 요청 재시도
      } catch (err) {
        console.error('토큰 재발급 실패:', err);
        // 필요한 경우 로그아웃 처리 또는 에러 처리
      }
    }
    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

export default api;
