import React, { useEffect } from 'react';
import './SignupModal.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input'; // 분리한 Input 컴포넌트 
import api from '../api'; // axios 설정 파일 
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const SignupModal = ({ closeModal }) => {
  const navigate = useNavigate();

  // 유효성 검사 스키마 정의
  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일 주소는 필수 입력 항목입니다.'),
    password: yup.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 최대 16자까지 허용됩니다.')
      .required('비밀번호를 입력하세요.'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력하세요.'),
    birthdate: yup.date().required('생년월일을 입력하세요.').typeError('유효한 생년월일을 입력하세요.'),
    gender: yup.string().oneOf(['male', 'female'], '성별을 선택하세요.').required('성별을 선택하세요.')
  });

  // useForm 훅 설정
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // 회원가입 Mutation 설정
  const signupMutation = useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: (response) => {
      console.log('회원가입 성공', response.data);
      closeModal();
      console.log('회원가입 상태 업데이트 완료');
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error.response?.data || error.message);
    },
  });

  // 모달이 열릴 때 body 스크롤 방지 설정
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // 폼 제출 시 처리 함수
  const onSubmit = (data) => {
    const { email, password, confirmPassword, birthdate, gender } = data;
    signupMutation.mutate({
      email,
      password,
      passwordCheck: confirmPassword, // API 요구사항에 따라 추가
      birthdate,
      gender,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <h2>회원가입</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 입력 필드 */}
          <Input 
            type="email" 
            placeholder="이메일 주소를 입력하세요" 
            register={register("email")} 
            error={errors.email}
          />

          {/* 비밀번호 입력 필드 */}
          <Input 
            type="password" 
            placeholder="비밀번호 입력" 
            register={register("password")} 
            error={errors.password}
          />

          {/* 비밀번호 확인 입력 필드 */}
          <Input 
            type="password" 
            placeholder="비밀번호 확인" 
            register={register("confirmPassword")} 
            error={errors.confirmPassword}
          />

          {/* 생년월일 입력 필드 */}
          <Input 
            type="date" 
            placeholder="생년월일" 
            register={register("birthdate")} 
            error={errors.birthdate}
          />

          {/* 성별 선택 필드 */}
          <div className="input-field">
            <select {...register("gender")} defaultValue="">
              <option value="" disabled>성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
            {errors.gender && <p className="error-message">{errors.gender.message}</p>}
          </div>
          
          <button type="submit" className="signup-btn">회원가입 완료</button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
