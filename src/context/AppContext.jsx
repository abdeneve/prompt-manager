import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase';
import { loadData, loadCommandsByPromptId } from '../hooks/useData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCategorySkeleton, setShowCategorySkeleton] = useState(true);
  const [showPromptSkeleton, setShowPromptSkeleton] = useState(true);
  const [showCommandSkeleton, setShowCommandSkeleton] = useState(true);
  const [showParameterSkeleton, setShowParameterSkeleton] = useState(true);
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [categories, setCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [commands, setCommands] = useState([]);
  const [originalCommands, setOriginalCommands] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    prompts: []
  });

  const getPromptsByCategory = (categoryId) => {
    return prompts.filter(prompt => prompt.CategoryId === categoryId);
  };

  const getCommandsByPrompt = (promptId) => {
    return commands
      .filter(command => command.PromptId === promptId)
      .sort((a, b) => a.Sequence - b.Sequence);
  };

  const getParametersByCommand = (commandId) => {
    return parameters
      .filter(parameter => parameter.CommandId === commandId)
      .sort((a, b) => a.Sequence - b.Sequence);
  }

  const setSelectedCategoryById = (categoryId) => {
    const category = categories.find(category => category.CategoryId === categoryId);
    setSelectedCategory(category)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserPhoto(user?.photoURL || null)
      setIsLoading(false);

      loadData( 
        setShowCategorySkeleton, 
        setShowPromptSkeleton,
        setShowParameterSkeleton,
        setCategories, 
        setPrompts, 
        setParameters);
    });

    return () => unsubscribe();
  }, []);

  // Cargar commands cuando cambie el selectedPrompt
  useEffect(() => {
    if (selectedPrompt) {
      loadCommandsByPromptId(selectedPrompt.PromptId, setShowCommandSkeleton, setCommands, setOriginalCommands);
    } else {
      // Si no hay prompt seleccionado, limpiar los commands
      setCommands([]);
      setOriginalCommands([]);
    }
  }, [selectedPrompt]);

  useEffect(() => {
    let filteredPrompts = prompts;

    if (searchTerm.length === 0 && !selectedCategory) {
      filteredPrompts = prompts;
    } else if (searchTerm.length === 0 && selectedCategory) {
      filteredPrompts = getPromptsByCategory(selectedCategory.CategoryId);
    } else if (searchTerm.length > 0 && !selectedCategory) {
      filteredPrompts = prompts.filter(prompt =>
        prompt.Objective.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    else if (searchTerm.length > 0 && selectedCategory) {
      filteredPrompts = prompts.filter(prompt =>
        prompt.Objective.toLowerCase().includes(searchTerm.toLowerCase()) && prompt.CategoryId === selectedCategory.CategoryId
      )
    }
    setSearchResults({ prompts: filteredPrompts });

  }, [prompts, selectedCategory, searchTerm]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showCategorySkeleton, 
        setShowCategorySkeleton,
        showPromptSkeleton, 
        setShowPromptSkeleton,
        showCommandSkeleton, 
        setShowCommandSkeleton,
        user,
        userPhoto,
        userRole,
        categories,
        setCategories,
        prompts,
        setPrompts,
        commands,
        setCommands,
        originalCommands,
        setOriginalCommands,
        parameters,
        setParameters,
        selectedCategory,
        setSelectedCategory,
        selectedPrompt,
        setSelectedPrompt,
        selectedCommand,
        setSelectedCommand,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        setSelectedCategoryById,
        getCommandsByPrompt,
        getParametersByCommand
      }}
    >
      {children}
    </AppContext.Provider>
  );
};