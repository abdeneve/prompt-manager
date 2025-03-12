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
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 break-words">{prompt.Objective}</h2>
      <p className="text-gray-700 mb-2 text-sm sm:text-base">
        <span className="font-medium">Objetivo:</span> {prompt.Description}
      </p>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        <span className="font-medium">Referência de vídeo:</span>
        <a
          href={prompt.Url_video_reference}
          className="break-all hover:text-blue-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {prompt.Url_video_reference}
        </a>
      </p>
      <div className="flex flex-wrap items-center mb-4 gap-2">
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
      <div className="overflow-x-auto w-full">
        <CommandList />
      </div>
    </div>
  )
}
export default PromptDetailView;