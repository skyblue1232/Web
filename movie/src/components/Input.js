import React from 'react';

const Input = ({ type, placeholder, register, error }) => (
  <div className="input-field">
    <input type={type} placeholder={placeholder} {...register} />
    {error && <p className="error-message">{error.message}</p>}
  </div>
);

export default Input;
