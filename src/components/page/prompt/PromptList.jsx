import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import PromptListItem from './PromptListItem';

function PromptList() {
    const { searchResults } = useAppContext();

    const promptsToRender = searchResults.prompts

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px] min-w-[50px] max-w-[200px] flex-1">
                        Objetivo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[600px] min-w-[200px] max-w-[600px] flex-1">
                        Descripción
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {promptsToRender?.map((prompt) => (
                    <PromptListItem prompt={prompt} key={prompt.id} />
                ))}
            </tbody>
        </table>
    );
}
export default PromptList;