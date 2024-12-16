import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as S from './SignupStyles'; // 스타일 파일 임포트

// 타입 정의
interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  gender: 'male' | 'female';
}

interface SignupModalProps {
  closeModal: () => void;
}

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일은 필수입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
  birthdate: yup.date().required('생년월일을 입력하세요.'),
  gender: yup.string().oneOf(['male', 'female'], '성별을 선택하세요.').required('성별을 선택하세요.'),
});

const SignupModal: React.FC<SignupModalProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormInputs) => api.post('/auth/register', data),
    onSuccess: () => {
      closeModal();
      navigate('/login');
    },
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => signupMutation.mutate(data);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.CloseButton onClick={closeModal}>&times;</S.CloseButton>
        <h2>회원가입</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.InputField>
            <Input type="email" placeholder="이메일" register={register('email')} error={errors.email} />
          </S.InputField>
          <S.InputField>
            <Input type="password" placeholder="비밀번호" register={register('password')} error={errors.password} />
          </S.InputField>
          <S.InputField>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              register={register('confirmPassword')}
              error={errors.confirmPassword}
            />
          </S.InputField>
          <S.InputField>
            <Input type="date" placeholder="생년월일" register={register('birthdate')} error={errors.birthdate} />
          </S.InputField>
          <S.InputField>
            <select {...register('gender')} defaultValue="">
              <option value="" disabled>
                성별 선택
              </option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
            {errors.gender && <S.ErrorMessage>{errors.gender.message}</S.ErrorMessage>}
          </S.InputField>

          <S.SignupButton type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? '회원가입 중...' : '회원가입 완료'}
          </S.SignupButton>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default SignupModal;
