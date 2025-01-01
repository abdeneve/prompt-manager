import React from 'react';
import { useAppContext } from '../../context/AppContext';
import CategoryView from '../page/category/CategoryView';
import PromptDetailView from '../page/prompt/PromptDetailView';
import ParameterList from '../page/parameter/ParameterList';

function MainContent({ className }) {
  const { selectedPrompt, selectedCommand } = useAppContext();

  if (selectedCommand) {
    return (
      <div className={className}>
        <ParameterList command={selectedCommand} />
      </div>
    );
  }

  if (selectedPrompt) {
    return (
      <div className={className}>
        <PromptDetailView prompt={selectedPrompt} />
      </div>
    );
  }

  return (
    <div className={className}>
      <CategoryView />
    </div>
  );
}

export default MainContent;