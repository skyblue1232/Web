import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as S from './LoginStyles';

// Props 타입 정의
interface LoginModalProps {
  onLogin: () => void;
  closeModal?: () => void;
}

// 폼 입력 타입 정의
interface LoginFormInputs {
  email: string;
  password: string;
}

// Yup 유효성 검사 스키마
const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일을 입력하세요').required('이메일을 입력하세요'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 가능합니다')
    .required('비밀번호를 입력하세요'),
});

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, closeModal }) => {
  const navigate = useNavigate();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  // 로그인 Mutation 설정
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) => api.post('/auth/login', data),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('로그인 성공:', response.data);
      onLogin(); // 로그인 상태 변경
      navigate('/'); // 로그인 후 메인 페이지로 이동
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.response?.data || error.message);
    },
  });

  // 폼 제출 처리 함수
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>로그인</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.InputField>
            <S.Input
              type="email"
              placeholder="이메일"
              {...register('email')}
            />
            {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
          </S.InputField>

          <S.InputField>
            <S.Input
              type="password"
              placeholder="비밀번호"
              {...register('password')}
            />
            {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
          </S.InputField>

          <S.LoginButton type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </S.LoginButton>

        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default LoginModal;
