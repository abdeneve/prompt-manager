import React from 'react';
import { useAppContext } from '../../context/AppContext';

function Breadcrumbs({ className }) {
    const { selectedCategory, selectedPrompt, selectedCommand } = useAppContext();
    const { setSelectedCategory, setSelectedPrompt, setSelectedCommand } = useAppContext();
    let breadcrumbItems = [];

    if (!selectedCategory) {
        breadcrumbItems.push({
            name: "Seleccione una categoría",
            onClick: () => {
                return null
            }
        })
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
            <ol className="flex space-x-2">
                {
                    breadcrumbItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <button onClick={item.onClick} className={"font-medium text-gray-500 hover:text-gray-700"}>
                                    {item.name}
                                </button>
                                {index < breadcrumbItems.length - 1 && (
                                    <span className="mx-2 text-gray-400">/</span>
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