import React from 'react';
import { useAppContext } from '../../context/AppContext';

function Breadcrumbs({ className }) {
    const { selectedCategory, selectedPrompt, selectedCommand } = useAppContext();
    const { setSelectedCategory, setSelectedPrompt, setSelectedCommand } = useAppContext();
    let breadcrumbItems = [];

    if(!selectedCategory && !selectedPrompt && !selectedCommand) {
        breadcrumbItems.push({
            name: "Todos",
            onClick: () => {
            }
        });
    }

    if (selectedCategory) {
        breadcrumbItems = [];
        breadcrumbItems.push({
            name: "Categoria",
            onClick: () => {
                setSelectedCategory(null);
                setSelectedPrompt(null);
                setSelectedCommand(null);
            }
        });
        breadcrumbItems.push({
            name: selectedCategory.Name,
            onClick: () => {
                setSelectedPrompt(null);
                setSelectedCommand(null);
            }
        })
    }

    if (selectedPrompt) {
        breadcrumbItems.push({
            name: selectedPrompt.Objective,
            onClick: () => {
                setSelectedCommand(null);
            }
        })
    }

    if (selectedCommand) {
        breadcrumbItems.push({
            name: selectedCommand.Name,
            onClick: () => {
                return null
            }
        })
    }


    return (
        <nav className={className}>
            <ol className="flex flex-wrap items-center space-x-1">
                {
                    breadcrumbItems.map((item, index) => {
                        return (
                            <li key={index} className="flex items-center max-w-full">
                                <button
                                    onClick={item.onClick}
                                    className="font-medium text-gray-500 hover:text-gray-700 text-sm sm:text-base truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-full"
                                    title={item.name}
                                >
                                    {item.name}
                                </button>
                                {index < breadcrumbItems.length - 1 && (
                                    <span className="mx-2 text-gray-400 flex-shrink-0">/</span>
                                )}
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
}

export default Breadcrumbs;