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
        bg-gradient-to-r from-[#0F172A] to-[#4A00E0]
        text-white
        overflow-hidden
      "
    >
      {/* Contenedor principal con efecto de pulso */}
      <div className="relative flex flex-col items-center">
        {/* Círculos con efecto de pulso */}
        <div className="absolute animate-ping-slow opacity-30 h-32 w-32 rounded-full bg-cyan-400"></div>
                
        {/* Contenedor del Spinner y el texto */}
        <div className="relative z-10 flex flex-col items-center space-y-6 backdrop-blur-sm">
          {/* Spinner moderno */}
          <div className="relative">
            {/* Anillo exterior con pulso */}
            <div className="absolute inset-0 animate-pulse-fast rounded-full border-4 border-cyan-300 opacity-50"></div>
            
            {/* Anillo interior giratorio */}
            <svg
              className="animate-spin h-16 w-16 text-cyan-400"
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
                strokeWidth="2"
              ></circle>
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            
            {/* Punto central con brillo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse-fast"></div>
            </div>
          </div>

          {/* Texto con efecto de brillo */}
          <div className="flex space-x-1">
            <span className="font-bold text-cyan-100 text-xl tracking-wider animate-glow">
              Loading
            </span>
            <span className="flex space-x-1">
              <span className="animate-bounce-slow delay-100 text-xl">.</span>
              <span className="animate-bounce-slow delay-200 text-xl">.</span>
              <span className="animate-bounce-slow delay-300 text-xl">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
