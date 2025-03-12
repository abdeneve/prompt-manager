import React from 'react';
import InlineInput from '../../ui/InlineInput';
import { useAppContext } from '../../../context/AppContext';

function ParameterItem({ parameter }) {
  const { 
    userRole, 
    originalCommands, 
    setCommands, 
    parameters, 
    setParameters,
    selectedCommand,
    setSelectedCommand
  } = useAppContext();

  const updateParameterValue = (value) => {
    const updatedParameters = parameters.map(param => {
      if (param.ParameterId === parameter.ParameterId) {
        return { ...param, Value: value }
      }
      return param;
    })
    setParameters(updatedParameters);
    updateCommand(value);
  }

  const updateCommand = (value) => {
    if (!value || value.length === 0) {
      return;
    }

    // Usar el comando actual como base, no el original
    let commandToUpdate = selectedCommand.Command;
    
    // Buscar el valor actual del parámetro (si existe) o usar el nombre del parámetro
    const currentValue = parameter.Value || parameter.Name;
    
    // Escapar caracteres especiales en el valor actual para la expresión regular
    const escapedCurrentValue = currentValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Crear una expresión regular con el valor actual escapado y el modificador global
    const regex = new RegExp(escapedCurrentValue, 'g');
    
    // Reemplazar todas las ocurrencias del valor actual con el nuevo valor
    commandToUpdate = commandToUpdate.replace(regex, value);

    // Crear el comando actualizado
    const updatedSelectedCommand = {
      ...selectedCommand,
      Command: commandToUpdate
    };
    
    // Actualizar todos los comandos
    const updatedCommands = originalCommands.map((cmd) => {
      if (cmd.CommandId !== selectedCommand.CommandId) {
        return cmd;
      }
      return updatedSelectedCommand;
    });

    setSelectedCommand(updatedSelectedCommand);
    setCommands(updatedCommands);
  }

  return (
    <tr>
      <td className="px-2 sm:px-4 py-2 sm:py-4">
        <div className="text-xs sm:text-sm text-gray-900">{ parameter.Sequence }</div>
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
        <div className="truncate">{ parameter.Name }</div>
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
        <InlineInput value={parameter.Value} onSave={updateParameterValue} />
      </td>
      <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm font-medium">
        {userRole === "admin" && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Editar
            </a>
            <a href="#" className="text-red-600 hover:text-red-900">
              Eliminar
            </a>
          </div>
        )}
      </td>
    </tr>
  )
}
export default ParameterItem;