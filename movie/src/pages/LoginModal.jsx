import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../api';
import { useNavigate } from 'react-router-dom';

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

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      const { accessToken, refreshToken } = response.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('로그인 성공:', response.data);
      onLogin(); // 로그인 상태 변경
      navigate(''); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
    }
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

          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
