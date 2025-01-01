import React from 'react';
import { useAppContext } from '../../../context/AppContext';

function PromptListItem({ prompt }) {
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
    <tr onClick={handleSelect} className="cursor-pointer hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{prompt.Objective}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {prompt.Description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        {userRole === "admin" &&(
          <>
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Editar
            </a>
            <a href="#" className="text-red-600 hover:text-red-900 ml-4">
              Eliminar
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 ml-4">
              Duplicar
            </a>
          </>
        )}
      </td>
    </tr>
  );
}

export default PromptListItem;