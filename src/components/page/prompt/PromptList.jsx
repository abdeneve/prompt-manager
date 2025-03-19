import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppContext } from '../../../context/AppContext';
import PromptListItem from './PromptListItem';
import Table from '../../ui/Table';

function PromptList() {
    const { isLoading, searchResults } = useAppContext();

    const promptsToRender = searchResults.prompts;

    return (
        <div className="w-full">
            <Table>
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/3">
                            Objetivo
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/3">
                            Descrição
                        </th>
                        <th scope="col" className="relative px-3 sm:px-6 py-2 sm:py-3 w-10">
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                        <tr>
                            <td>
                                <Skeleton count={11} height={30} className="mb-2" />
                            </td>
                            <td>
                                <Skeleton count={11} height={30} className="mb-2" />
                            </td>
                            <td>
                                <Skeleton count={11} height={30} className="mb-2" />
                            </td>
                        </tr>
                    ) : promptsToRender?.map((prompt, index) => (
                        <PromptListItem
                            prompt={prompt}
                            key={prompt.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default PromptList;