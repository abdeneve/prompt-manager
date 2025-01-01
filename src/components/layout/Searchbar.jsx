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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 2200" className="w-full h-full">
      <path d="M1940 1100c0 49.84-4.34 98.66-12.66 146.11C1858.19 1640.38 1514.08 1940 1100 1940c-12.72 0-25.37-.28-37.95-.84C615.74 1919.31 260 1551.2 260 1100c0-463.92 376.08-840 840-840s840 376.08 840 840z" fill="#1176ff" />
      <path d="M1927.34 1246.11C1858.19 1640.38 1514.08 1940 1100 1940c-12.72 0-25.37-.28-37.95-.84-187.06-187.1-341.85-342.01-343.06-343.4-24.36-21.09-37.6-53.25-33.93-86.61 8.15-74.21 31.67-148.08 85.43-181.54 99.07-61.65 197.41-87.92 197.41-87.92 3.47-10.78 7.36-46.46 9.4-82.98-12.55-13.03-24.98-26.63-38.09-39.52-21.18-20.82-26.42-49.21-32.96-84.96-4.68-2.08-7.35-6.1-9.76-9.78-.02-.03-.04-.07-.07-.11-4.75-2.06-7.44-6.12-9.87-9.83-.02-.03-.04-.07-.07-.11-4.75-2.06-7.44-6.12-9.87-9.82-2.96-4.54-4.13-9.97-5.23-15.27-3.99-19.07-7.98-38.13-11.96-57.19-3-14.32-6.01-28.99-3.98-43.48.98-6.85 3.41-14.03 9.04-18.06 5.62-4.03 15.02-3.06 17.84 3.27 0 0-9.12-89.73-9.12-82.18-7.62-8.46-13.65-26.88-11.13-41.12 2.52-14.23 7.05-28.08 9.31-42.35 2.46-15.68 2.21-31.85 6.71-47.07 6.34-21.45 21.51-39.03 36.95-55.22 10.94-11.46 22.25-22.6 34.58-32.53 24.71-19.86 54.16-34.8 85.67-38.33 10.11-1.13 20.31-1.08 30.48-1.03 11.4.06 22.82.11 34.23.17 11.41-.06 22.83-.11 34.23-.17 10.17-.05 20.37-.1 30.48 1.03 31.51 3.53 60.96 18.47 85.67 38.33 10.77 8.67 20.75 18.26 30.39 28.19 2.01 1.94 358.22 358.15 646.57 646.54z" fill="#1052e5" />
      <path d="M1453.46 1612.677C1391.297 1638.104 1279.94 1668 1100 1668s-291.297-29.896-353.46-55.323c-41.326-16.903-66.356-59.143-61.483-103.529 8.152-74.208 31.676-148.077 85.437-181.534 99.069-61.653 197.409-87.922 197.409-87.922 3.465-10.783 7.359-46.458 9.398-82.984-12.547-13.033-24.982-26.633-38.096-39.521-24.966-24.536-27.775-59.605-36.687-104.841-16.377 4.655-21.557-3.141-25.905-9.771-2.963-4.533-4.129-9.965-5.238-15.268-3.991-19.064-7.974-38.128-11.957-57.192-2.995-14.32-6.007-28.989-3.975-43.479.971-6.849 3.408-14.029 9.034-18.06 5.626-4.023 15.025-3.052 17.842 3.27 0 0-9.123-89.727-9.123-82.174-7.618-8.459-13.649-26.884-11.123-41.124 2.518-14.231 7.043-28.082 9.301-42.354 2.469-15.672 2.21-31.846 6.711-47.065 6.347-21.452 21.517-39.035 36.954-55.217 10.937-11.463 22.246-22.602 34.583-32.534 24.707-19.858 54.157-34.801 85.663-38.331 10.111-1.125 20.311-1.077 30.478-1.028l34.234.17 34.234-.17c10.167-.049 20.367-.097 30.478 1.028 31.506 3.53 60.957 18.473 85.663 38.331 12.337 9.933 23.646 21.072 34.583 32.534 15.438 16.182 30.608 33.765 36.954 55.217 4.501 15.219 4.242 31.393 6.711 47.065 2.259 14.272 6.784 28.123 9.301 42.354 2.526 14.239-3.505 32.664-11.123 41.124 0-7.553-9.123 82.174-9.123 82.174 2.817-6.322 12.216-7.294 17.842-3.27 5.626 4.031 8.063 11.212 9.034 18.06 2.032 14.49-.979 29.159-3.975 43.479-3.983 19.064-7.966 38.128-11.957 57.192-1.109 5.302-2.275 10.734-5.238 15.268-4.347 6.63-9.528 14.426-25.905 9.771-8.913 45.236-11.722 80.304-36.687 104.841-13.114 12.887-25.548 26.487-38.096 39.521 2.04 36.526 5.934 72.201 9.398 82.984 0 0 98.34 26.269 197.409 87.922 53.76 33.457 77.285 107.326 85.437 181.534 4.879 44.386-20.151 86.627-61.477 103.529z" fill="#fff" />
    </svg>
  );

  return (
    <div className={`${className} flex items-center justify-between`}>
      {!selectedPrompt && (
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSearchChange}
        />
      )}

      {user && (
        <div className="relative ml-2" ref={menuRef}>
          <button onClick={toggleMenu} className="rounded-full overflow-hidden border-0 border-gray-300 hover:border-blue-500 focus:outline-none">
            {userPhoto ? <img src={userPhoto} alt="User profile" style={{ width: '30px', height: '30px' }} /> : <div className="w-[32px] h-[32px] rounded-full"><UserIcon /></div>}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 p-4 w-[436px] bg-white border rounded shadow-lg z-10"  >
              <div className="flex flex-col items-center p-4">
                {userPhoto ? <img src={userPhoto} alt="User profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> : <div className="w-[80px] h-[80px] bg-gray-400 rounded-full"><UserIcon /></div>}
                <p className="mt-2 font-bold">{user?.email}</p>
              </div>
              <Button className="block w-full text-center py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={handleLogout}
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