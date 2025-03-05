import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import CommandListItem from './CommandListItem';

function CommandList({ prompt }) {
    const { getCommandsByPrompt } = useAppContext();
    const commands = getCommandsByPrompt(prompt.PromptId)
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[90px] min-w-[80px] max-w-[150px] flex-1">
                    Sequência
                    </th>
                    <th scope="col" className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px] min-w-[100px] max-w-[150px] flex-1">
                    Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[600px] min-w-[200px] max-w-[600px]">
                    Prompt
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {commands.map(command => (
                    <CommandListItem key={command.CommandId} command={command} />
                ))}
            </tbody>
        </table>
    )
}
export default CommandList;