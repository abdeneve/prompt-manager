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

    const relevantParameters = parameters.filter(
      (param) => param.CommandId === selectedCommand.CommandId
    );

    const updatedCommands = originalCommands.map((cmd) => {
      if (cmd.CommandId !== selectedCommand.CommandId) {
        return cmd;
      }
  
      let commandToUpdate = cmd.Command;
      relevantParameters.forEach((param) => {
        commandToUpdate = commandToUpdate.replace(param.Name, value);
      });
  
      return { ...cmd, Command: commandToUpdate };
    });

    const updatedSelectedCommand = updatedCommands.find(
      (cmd) => cmd.CommandId === selectedCommand.CommandId
    );

    setSelectedCommand(updatedSelectedCommand);
    setCommands(updatedCommands);
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{ parameter.Sequence }</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        { parameter.Name }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <InlineInput value={parameter.Value} onSave={updateParameterValue} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {userRole === "admin" && (
          <>
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
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
export default ParameterItem;