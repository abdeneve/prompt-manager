import React from 'react';
import CategoryList from '../page/category/CategoryList';
import AddCategoryButton from '../page/category/AddCategoryButton';

function Sidebar({className}) {
    return (
      <aside className={className}>
        <AddCategoryButton />
        <div className="flex justify-start mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Prompt Manager</h1>
        </div>
        <h2 className="font-semibold text-gray-700 mb-4">Categorías</h2>
        <CategoryList />
      </aside>
    );
  }
  
  export default Sidebar;