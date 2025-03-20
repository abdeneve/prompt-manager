const airtableConfig = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  categoriesTableId: import.meta.env.VITE_AIRTABLE_CATEGORIES_TABLE_ID,
  promptsTableId: import.meta.env.VITE_AIRTABLE_PROMPTS_TABLE_ID,
  commandsTableId: import.meta.env.VITE_AIRTABLE_COMMANDS_TABLE_ID,
  parametersTableId: import.meta.env.VITE_AIRTABLE_PARAMETERS_TABLE_ID,
};

const fetchData = async (tableId, promptId=null) => {
  const filterByPromptId = promptId ? `?filterByFormula={PromptId}=${promptId}` : '';
  const response = await fetch(
    `https://api.airtable.com/v0/${airtableConfig.baseId}/${tableId}${filterByPromptId}`,
    {
      headers: { Authorization: `Bearer ${airtableConfig.apiKey}` },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

// Función para cargar commands por PromptId
export const loadCommandsByPromptId = async (promptId, setShowCommandSkeleton, setCommands, setOriginalCommands) => {
  try {
    // Obtener commands por promptId
    setShowCommandSkeleton(true);
    const commands = await fetchData(airtableConfig.commandsTableId, promptId);
    const orderedCommands = commands.sort((a, b) => a.Sequence - b.Sequence);
    setCommands(orderedCommands);
    setOriginalCommands(commands);
    setShowCommandSkeleton(false);
  } catch (error) {
    console.error('Error fetching commands from Airtable:', error);
  }
};

export const loadData = async ( 
  setShowCategorySkeleton, 
  setShowPromptSkeleton,
  setShowParameterSkeleton,
  setCategories, 
  setPrompts, 
  setParameters) => {
  try {
    setShowCategorySkeleton(true);
    const categories = await fetchData(airtableConfig.categoriesTableId);
    categories.sort((a, b) => a.CategoryId - b.CategoryId);
    setCategories(categories);
    setShowCategorySkeleton(false);

    setShowPromptSkeleton(true);
    const prompts = await fetchData(airtableConfig.promptsTableId);
    prompts.sort((a, b) => a.PromptId - b.PromptId);
    setPrompts(prompts);
    setShowPromptSkeleton(false);

    setShowParameterSkeleton(true);
    const parameters = await fetchData(airtableConfig.parametersTableId);
    setParameters(parameters);
    setShowParameterSkeleton(false);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
  }
};