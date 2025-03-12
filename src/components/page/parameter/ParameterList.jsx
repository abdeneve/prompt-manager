import React from 'react';
import ParameterItem from './ParameterItem';
import AddParameterButton from './AddParameterButton';
import { useAppContext } from '../../../context/AppContext';
import Button from '../../ui/Button';
import Table from '../../ui/Table';

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
        <div className="w-full">
            <div className="flex flex-wrap items-center mb-4 gap-2">
                <Button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full">Voltar</Button>
                {userRole === "admin" && (
                    <AddParameterButton command={command} />
                )}
            </div>
            
            <div className="mb-6">
                <Table>
                    <thead>
                        <tr>
                            <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                                Número
                            </th>
                            <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[25%]">
                                Parâmetro
                            </th>
                            <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[50%]">
                                Valor
                            </th>
                            <th scope="col" className="relative px-2 sm:px-4 py-2 sm:py-3 w-[10%]">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {parameters.map(parameter => (
                            <ParameterItem key={parameter.id} parameter={parameter} />
                        ))}
                    </tbody>
                </Table>
            </div>
            
            <div className="mt-6 text-gray-700">
                <div className="mt-4">
                    <h2 className="font-semibold text-base sm:text-lg">Prompt:</h2>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md overflow-x-auto">
                        <p className="text-sm sm:text-base break-words whitespace-pre-wrap">
                            {command.Command}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <Button
                        onClick={handleCopyToClipboard}
                        className="
                        bg-blue-500
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