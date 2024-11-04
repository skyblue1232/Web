import React from 'react';
import './LoginModal.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginModal = ({ onLogin }) => { // 정확하게 onLogin prop 사용
  // 유효성 검사 스키마
  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일 주소를 입력하세요').required('이메일을 입력해주세요'),
    password: yup.string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .max(16, '비밀번호는 16자 이하여야 합니다')
      .required('비밀번호를 입력해주세요'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('로그인 데이터:', data);
    onLogin(); // onLogin prop을 호출하여 로그인 상태 변경
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>로그인</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field">
            <input
              type="email"
              placeholder="이메일"
              {...register("email")}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password")}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
