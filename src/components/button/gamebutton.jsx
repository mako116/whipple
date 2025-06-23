import React from 'react';
import { FaSync } from 'react-icons/fa';

 

const Button  = ({
  isDisabled = false,
  isLoading = false,
  isSpinning= false,
  onClick,
  text,
  className = '',
  icon
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center mt-4 gap-2 py-3 cursor-pointer text-white rounded transition-all duration-300 ${
        isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'
      } ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {icon &&
        <FaSync/>
       }
      {isLoading ? 'Publishing...' : text}
      {isSpinning ? 'Spinning...' : ''}
    </button>
  );
};

export default Button;
