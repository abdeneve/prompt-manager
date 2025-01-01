const airtableConfig = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  categoriesTableId: import.meta.env.VITE_AIRTABLE_CATEGORIES_TABLE_ID,
  promptsTableId: import.meta.env.VITE_AIRTABLE_PROMPTS_TABLE_ID,
  commandsTableId: import.meta.env.VITE_AIRTABLE_COMMANDS_TABLE_ID,
  parametersTableId: import.meta.env.VITE_AIRTABLE_PARAMETERS_TABLE_ID,
};

const fetchData = async (tableId) => {
  const response = await fetch(
    `https://api.airtable.com/v0/${airtableConfig.baseId}/${tableId}`,
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

export const loadData = async (setCategories, setPrompts, setCommands, setOriginalCommands, setParameters) => {
  try {
    // Llamadas en paralelo con Promise.all
    const [categories, prompts, commands, parameters] = await Promise.all([
      fetchData(airtableConfig.categoriesTableId),
      fetchData(airtableConfig.promptsTableId),
      fetchData(airtableConfig.commandsTableId),
      fetchData(airtableConfig.parametersTableId),
    ]);

    // Ordenar categorías por CategoryId
    categories.sort((a, b) => a.CategoryId - b.CategoryId);

    // Ordenar prompts por PromptId
    prompts.sort((a, b) => a.PromptId - b.PromptId);

    // Guardar en estados
    setCategories(categories);
    setPrompts(prompts);
    setCommands(commands);
    setOriginalCommands(commands);
    setParameters(parameters);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
  }
};