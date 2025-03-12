import React from 'react';
import { useAppContext } from '../../../context/AppContext';

function PromptListItem({ prompt, className = "" }) {
  const { 
    userRole,
    selectedCategory, 
    setSelectedPrompt, 
    setSelectedCommand, 
    setSelectedCategoryById 
  } = useAppContext();

  const handleSelect = () => {
    if (!selectedCategory) {
      setSelectedCategoryById(prompt.CategoryId)
    }
    setSelectedPrompt(prompt);
    setSelectedCommand(null);
  }

  return (
    <tr onClick={handleSelect} className={`cursor-pointer hover:bg-gray-100 ${className}`}>
      <td className="px-3 sm:px-6 py-2 sm:py-4 truncate">
        <div className="text-xs sm:text-sm text-gray-500 truncate">{prompt.Objective}</div>
      </td>
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
        <div className="truncate max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-full">
          {prompt.Description}
        </div>
      </td>
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium">
        {userRole === "admin" &&(
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Editar
            </a>
            <a href="#" className="text-red-600 hover:text-red-900">
              Eliminar
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hidden md:inline">
              Duplicar
            </a>
          </div>
        )}
      </td>
    </tr>
  );
}

export default PromptListItem;