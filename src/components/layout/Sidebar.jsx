import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CategoryList from '../page/category/CategoryList';
import AddCategoryButton from '../page/category/AddCategoryButton';
import { useAppContext } from '../../context/AppContext';

function Sidebar({className, toggleSidebar}) {
    const { isLoading } = useAppContext();
    
    return (
      <aside className={`${className} overflow-x-hidden`}>
        <div className="flex justify-between items-center mb-4">
          <button
            className="md:hidden absolute top-4 right-4 text-gray-600"
            aria-label="Close sidebar"
            onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <AddCategoryButton />
        <div className="flex justify-start mb-4 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 max-w-full truncate whitespace-nowrap overflow-hidden">Gerenciador de prompts</h1>
        </div>
        <hr className="mb-4" />
        <h2 className="font-semibold text-gray-700 mb-4">Categorias</h2>
        <div className="w-full max-w-full">
          { isLoading ? (<Skeleton count={12} height={30} className="mb-2" />) : <CategoryList /> }
        </div>
      </aside>
    );
  }
  
  export default Sidebar;