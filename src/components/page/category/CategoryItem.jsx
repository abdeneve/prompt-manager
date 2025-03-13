import React from 'react';
import { useAppContext } from '../../../context/AppContext';

function CategoryItem({ category }) {
  const { setSelectedPrompt, setSelectedCommand, selectedCategory, setSelectedCategory } = useAppContext();
  const isActive = category.id === selectedCategory?.id;

  const handleSelect = () => {
    setSelectedCategory(category);
    setSelectedPrompt(null);
    setSelectedCommand(null)
  }

  return (
    <li onClick={handleSelect} className={`p-2 rounded cursor-pointer hover:bg-gray-200 flex justify-between ${isActive ? 'bg-blue-200' : ''}`}>
      <div className="w-full overflow-hidden">
        <h3 className={`font-medium text-gray-700 ${isActive ? 'text-blue-900' : ''} pl-5 truncate whitespace-nowrap overflow-hidden`}>{ category.Name }</h3>
      </div>
    </li>
  );
}

export default CategoryItem;