import React from 'react';

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 hover:bg-blue-700 text-white text-sm sm:text-base ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;