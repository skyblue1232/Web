import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const LoginModal = ({ onLogin, closeModal }) => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일을 입력하세요').required('이메일을 입력하세요'),
    password: yup.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .max(16, '비밀번호는 최대 16자까지 가능합니다')
      .required('비밀번호를 입력하세요'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // 로그인 Mutation 설정
  const loginMutation = useMutation({
    mutationFn: (data) => api.post('/auth/login', data),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('로그인 성공:', response.data);
      onLogin(); // 로그인 상태 변경
      navigate('/'); // 로그인 후 메인 페이지로 이동
    },
    onError: (error) => {
      console.error('로그인 실패:', error.response?.data || error.message);
    },
  });

  // 폼 제출 처리 함수
  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field">
            <input type="email" placeholder="이메일" {...register("email")} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="input-field">
            <input type="password" placeholder="비밀번호" {...register("password")} />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-btn" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
