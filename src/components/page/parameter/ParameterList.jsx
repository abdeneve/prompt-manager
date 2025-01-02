import React from 'react';
import ParameterItem from './ParameterItem';
import AddParameterButton from './AddParameterButton';
import { useAppContext } from '../../../context/AppContext';
import Button from '../../ui/Button';

function ParameterList({ command }) {
    const { userRole, getParametersByCommand, setSelectedCommand } = useAppContext();
    const parameters = getParametersByCommand(command.CommandId);

    const handleGoBack = () => {
        setSelectedCommand(null);
    }

    const handleCopyToClipboard = (e) => {
        e.stopPropagation();
         navigator.clipboard.writeText(command.Command)
            .then(()=> {
               console.log("Text copied to clipboard:", command.Name)
            })
           .catch(error =>{
                console.error("Failed to copy text:", error)
           })
     }

    return (
        <div>
            <div className="flex items-center mb-4 space-x-2">
                <Button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full">Volver</Button>
                {userRole === "admin" && (
                    <AddParameterButton command={command} />
                )}
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px] max-w-[200px] w-[150px]">
                            Parametro
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-1">
                            Valor
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {parameters.map(parameter => (
                        <ParameterItem key={parameter.id} parameter={parameter} />
                    ))}
                </tbody>
            </table>
            <div className="mt-8 text-gray-700">
                <div className="mt-4">
                    <h2 className="font-semibold">Prompt:</h2>
                    <p className="max-w-[800px]">
                        {command.Command}
                    </p> 
                </div>
                <div className="mt-4">
                    <Button 
                        onClick={handleCopyToClipboard} 
                        className="
                        text-gray-600 
                        hover:bg-blue-700
                        transition-colors
                        text-white
                        font-semibold
                        rounded-full"
                    >
                        Copiar
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ParameterList;