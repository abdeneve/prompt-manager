import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { signOut } from 'firebase/auth';
import auth from '../../firebase';
import Button from '../ui/Button';

function Searchbar({ className }) {
  const {
    user,
    userPhoto,
    setSearchTerm,
    selectedPrompt
  } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const menuRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchTerm('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
  );

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

      {user && (
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu} className="py-2 rounded-full overflow-hidden border-0 border-gray-300 hover:border-blue-500 focus:outline-none">
            {userPhoto ? <img src={userPhoto} alt="User profile" style={{ width: '32px', height: '32px' }} /> : <div className="w-[32px] h-[32px] rounded-full"><UserIcon /></div>}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 p-4 w-full sm:w-80 md:w-96 lg:w-[436px] bg-white border rounded shadow-lg z-10">
              <div className="flex flex-col items-center p-4">
                {userPhoto ?
                  <img src={userPhoto} alt="User profile" className="w-16 h-16 md:w-20 md:h-20 rounded-full" /> :
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full"><UserIcon /></div>
                }
                <p className="mt-2 font-bold text-sm md:text-base truncate max-w-full">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                className="
                w-full
                py-2
                mb-4
                bg-blue-600
                hover:bg-blue-700
                transition-colors
                text-white
                font-semibold
                rounded-full
                "
              >
                Cerrar Sesión
              </Button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Searchbar;