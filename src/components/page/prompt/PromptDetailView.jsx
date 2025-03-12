import React from 'react';
import CommandList from '../command/CommandList';
import AddCommandButton from '../command/AddCommandButton';
import { useAppContext } from '../../../context/AppContext';
import Button from '../../ui/Button';

function PromptDetailView({ prompt }) {
  const {setSelectedPrompt, setSelectedCommand} = useAppContext();

  const handleGoBack = () =>{
    setSelectedPrompt(null);
    setSelectedCommand(null);
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{prompt.Objective}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Objetivo:</span> {prompt.Description}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Referência de vídeo:</span> <a href={prompt.Url_video_reference}>{prompt.Url_video_reference}</a>
      </p>
      <div className="flex items-center mb-4 space-x-2">
        <Button
          onClick={handleGoBack}
          className="
          bg-gray-300
          hover:bg-gray-400
          text-gray-800
          rounded-full
          "
        >
        Voltar
        </Button>
        <AddCommandButton prompt={prompt} />
      </div>
      <CommandList />
    </div>
  )
}
export default PromptDetailView;