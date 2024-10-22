// import React from 'react';

// const Button = ({ onClick, children }) => {
//   return <button onClick={onClick}>{children}</button>;
// };

// export default Button;
// input.jsx
import React from 'react';

const Input = ({ onChange, value, placeholder }) => {
  return (
    <input 
      type="text" 
      onChange={onChange} 
      value={value} 
      placeholder={placeholder} 
    />
  );
};

export default Input;
