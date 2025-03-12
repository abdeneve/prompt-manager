import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import CommandListItem from './CommandListItem';
import Table from '../../ui/Table';

function CommandList() {
    const { commands } = useAppContext();
    
    return (
        <Table>
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                        Sequência
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                        Nome
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-[55%]">
                        Prompt
                    </th>
                    <th scope="col" className="relative px-2 sm:px-4 py-2 sm:py-3 w-[10%]">
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {commands.map(command => (
                    <CommandListItem key={command.CommandId} command={command} />
                ))}
            </tbody>
        </Table>
    )
}
export default CommandList;