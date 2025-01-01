import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Loading from '../auth/Loading';
import Login from '../auth/Login';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Breadcrumbs from './Breadcrumbs';
import Searchbar from './Searchbar';

function Layout() {
  const { user, isLoading } = useAppContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <div className="flex h-screen">
          <Sidebar className="w-64 bg-gray-100 p-4" />
          <div className="flex-1 flex flex-col">
            <Searchbar className="p-4"/>
            <Breadcrumbs className="p-4"/>
            <MainContent className="p-4 flex-1 overflow-y-auto" />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;