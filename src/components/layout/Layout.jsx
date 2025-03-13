import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Loading from '../auth/Loading';
import Login from '../auth/Login';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Breadcrumbs from './Breadcrumbs';
import Searchbar from './Searchbar';

function Layout() {
  const { user, isLoading } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar para móvil (oculto por defecto) */}
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden transition-opacity duration-300 ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebar}
          ></div>
          
          {/* Sidebar */}
          <div
            className={`fixed md:static inset-y-0 left-0 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition duration-300 ease-in-out z-50 md:z-0 w-80 md:w-88 lg:w-96 bg-gray-100 overflow-y-auto`}
          >
            <Sidebar className="p-4" toggleSidebar={toggleSidebar} />
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1 flex flex-col w-full md:flex-1 overflow-x-hidden">
            <div className="flex items-center p-4 w-full">
              <button
                className="mr-2 md:hidden text-gray-600 focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Searchbar className="flex-1" />
            </div>
            <Breadcrumbs className="px-4 py-2 w-full"/>
            <MainContent className="p-4 flex-1 overflow-y-auto w-full" />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;