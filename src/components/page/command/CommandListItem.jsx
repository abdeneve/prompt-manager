import React from 'react';
import { useAppContext } from '../../../context/AppContext';

function CommandListItem({ command, className = "" }) {
  const { userRole, setSelectedCommand } = useAppContext();

  const handleSelect = () => {
    setSelectedCommand(command)
  }

  const handleCopyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(command.Command)
      .then(() => {
        console.log("Text copied to clipboard:", command.Name)
      })
      .catch(error => {
        console.error("Failed to copy text:", error)
      })
  }

  return (
    <tr onClick={handleSelect} className={`cursor-pointer hover:bg-gray-100 ${className}`}>
      <td className="px-2 sm:px-4 py-2 sm:py-4">
        <div className="text-xs sm:text-sm text-gray-900">{command.Sequence}</div>
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4">
        <div className="text-xs sm:text-sm text-gray-900 truncate">{command.Name}</div>
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
        <div className="break-words line-clamp-2 sm:line-clamp-3">
          {command.Command}
        </div>
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-medium">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <a
            href="#"
            onClick={handleCopyToClipboard}
            className="text-gray-600 hover:text-gray-900"
          >
            Copiar
          </a>
          {userRole === "admin" && (
            <>
              <a href="#" className="text-indigo-600 hover:text-indigo-900 hidden sm:inline">
                Editar
              </a>
              <a href="#" className="text-red-600 hover:text-red-900 hidden sm:inline">
                Eliminar
              </a>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
export default CommandListItem;