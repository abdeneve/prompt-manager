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
  const menuRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
      <div className="flex-1">
        {!selectedPrompt && (
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 rounded-full"
            onChange={handleSearchChange}
          />
        )}
      </div>

      {user && (
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu} className="py-2 rounded-full overflow-hidden border-0 border-gray-300 hover:border-blue-500 focus:outline-none">
            {userPhoto ? <img src={userPhoto} alt="User profile" style={{ width: '32px', height: '32px' }} /> : <div className="w-[32px] h-[32px] rounded-full"><UserIcon /></div>}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 p-4 w-[436px] bg-white border rounded shadow-lg z-10"  >
              <div className="flex flex-col items-center p-4">
                {userPhoto ? <img src={userPhoto} alt="User profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> : <div className="w-[80px] h-[80px] rounded-full"><UserIcon /></div>}
                <p className="mt-2 font-bold">{user?.email}</p>
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