import React from 'react';

function Loading() {
  return (
    <div
      className="
        flex 
        items-center 
        justify-center 
        w-screen 
        h-screen 
        bg-gradient-to-r from-[#0A1F44] to-[#4B0082]
        text-white
      "
    >
      {/* Contenedor del Spinner y el texto */}
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <svg
          className="animate-spin h-8 w-8 text-[#00FFFF]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>

        {/* Texto */}
        <span className="font-semibold text-[#E6E6FA] text-lg tracking-wide">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Loading;
