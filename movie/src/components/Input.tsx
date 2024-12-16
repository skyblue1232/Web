import React from 'react';
import { FieldError } from 'react-hook-form'; // FieldError 타입 가져오기

interface InputProps {
  type: string;
  placeholder?: string;
  register: any; // React Hook Form의 `register` 함수 타입
  error?: FieldError; // FieldError 타입 사용
}

const Input: React.FC<InputProps> = ({ type, placeholder, register, error }) => (
  <div className="input-field">
    <input type={type} placeholder={placeholder} {...register} />
    {error?.message && <p className="error-message">{error.message}</p>}
  </div>
);

export default Input;
