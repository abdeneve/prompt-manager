import React from 'react';
import PromptList from '../../page/prompt/PromptList';
import AddPromptButton from '../../page/prompt/AddPromptButton';

function CategoryView() {
    return (
        <div>
            <AddPromptButton />
            <PromptList />
        </div>
    );
}

export default CategoryView;