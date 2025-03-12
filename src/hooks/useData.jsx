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
export const loadCommandsByPromptId = async (promptId, setCommands, setOriginalCommands) => {
  try {
    // Obtener commands por promptId
    const commands = await fetchData(airtableConfig.commandsTableId, promptId);
    const orderedCommands = commands.sort((a, b) => a.Sequence - b.Sequence);
    
    // Guardar en estados
    setCommands(orderedCommands);
    setOriginalorderedCommands(commands);
  } catch (error) {
    console.error('Error fetching commands from Airtable:', error);
  }
};

export const loadData = async (setCategories, setPrompts, setParameters) => {
  try {
    // Llamadas en paralelo con Promise.all
    const [categories, prompts, parameters] = await Promise.all([
      fetchData(airtableConfig.categoriesTableId),
      fetchData(airtableConfig.promptsTableId),
      fetchData(airtableConfig.parametersTableId),
    ]);

    // Ordenar categorías por CategoryId
    categories.sort((a, b) => a.CategoryId - b.CategoryId);

    // Ordenar prompts por PromptId
    prompts.sort((a, b) => a.PromptId - b.PromptId);

    // Guardar en estados
    setCategories(categories);
    setPrompts(prompts);
    setParameters(parameters);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
  }
};