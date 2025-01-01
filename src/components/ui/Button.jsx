import React from 'react';

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;