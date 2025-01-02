import React from 'react';
import CategoryItem from './CategoryItem';
import { useAppContext } from '../../../context/AppContext';


function CategoryList() {
  const { 
    categories, 
    setSelectedCategory, 
    setSelectedPrompt, 
    setSelectedCommand, 
    setSearchTerm 
  } = useAppContext();

  const handleClearSelectedCategory = () => {
    setSelectedCategory(null);
    setSelectedPrompt(null);
    setSelectedCommand(null);
    setSearchTerm('');
  }

  return (
    <ul className="space-y-2">
      <li onClick={handleClearSelectedCategory}
        className={`p-2 rounded cursor-pointer hover:bg-gray-200 flex justify-between`}>
        <div>
          <h3 className={`font-medium text-gray-700 pl-5`}>
            Todos
          </h3>
        </div>
      </li>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default CategoryList;