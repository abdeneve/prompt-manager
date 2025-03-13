import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import LogoutMenu from '../auth/LogoutMenu';

function Searchbar({ className }) {
  const {
    user,
    setSearchTerm,
    selectedPrompt
  } = useAppContext();
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <div className={`${className} flex items-center w-full gap-2`}>
      <div className="flex-1 relative">
        {!selectedPrompt && (
          <>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-5 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-all"
              onChange={handleSearchChange}
              value={inputValue}
            />
            {inputValue && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Limpiar búsqueda"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {user && <LogoutMenu />}

    </div>
  );
}

export default Searchbar;