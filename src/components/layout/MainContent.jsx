import React from 'react';
import { useAppContext } from '../../context/AppContext';
import CategoryView from '../page/category/CategoryView';
import PromptDetailView from '../page/prompt/PromptDetailView';
import ParameterList from '../page/parameter/ParameterList';

function MainContent({ className }) {
  const { selectedPrompt, selectedCommand } = useAppContext();

  if (selectedCommand) {
    return (
      <div className={`${className} w-full`}>
        <div className="max-w-full overflow-x-auto">
          <ParameterList command={selectedCommand} />
        </div>
      </div>
    );
  }

  if (selectedPrompt) {
    return (
      <div className={`${className} w-full`}>
        <div className="max-w-full overflow-x-auto">
          <PromptDetailView prompt={selectedPrompt} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} w-full`}>
      <div className="max-w-full overflow-x-auto">
        <CategoryView />
      </div>
    </div>
  );
}

export default MainContent;