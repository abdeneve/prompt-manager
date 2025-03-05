import React from 'react';
import { useAppContext } from '../../../context/AppContext';

function CommandListItem({ command }) {
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
    <tr onClick={handleSelect} className={"cursor-pointer hover:bg-gray-100"}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{command.Sequence}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{command.Name}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 w-[600px] min-w-[200px] max-w-[600px] break-words">
        {command.Command}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
        <a href="#" onClick={handleCopyToClipboard} className="text-gray-600 hover:text-gray-900">
          Copiar
        </a>
        {userRole === "admin" && (
          <>
            <a href="#" className="text-indigo-600 hover:text-indigo-900 ml-4">
              Editar
            </a>
            <a href="#" className="text-red-600 hover:text-red-900 ml-4">
              Eliminar
            </a>
          </>
        )}
      </td>
    </tr>
  )
}
export default CommandListItem;