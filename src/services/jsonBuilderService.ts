
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/builderJson/generateBuilder', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    // Return fallback data for development/testing
    return {
      flow: {
        onboarding: {
          '$contentActions': ['example'],
          '$conditionOutputs': ['example'],
          '$enteringCustomActions': [],
          '$leavingCustomActions': [],
          '$inputSuggestions': [],
          '$defaultOutput': { stateId: 'welcome', '$invalid': false },
          '$tags': [],
          id: 'onboarding',
          root: true,
          '$title': 'Início',
          '$position': { x: 139, y: 114 },
          '$invalidContentActions': false,
          '$invalidOutputs': false,
          '$invalidCustomActions': false,
          '$invalid': false
        },
        // ... more states would be here in a real response
      },
      globalActions: {
        '$contentActions': [],
        '$conditionOutputs': [],
        '$enteringCustomActions': [],
        '$leavingCustomActions': [],
        '$inputSuggestions': [],
        '$defaultOutput': { stateId: 'fallback', '$invalid': false },
        '$tags': [],
        id: 'global-actions',
        '$invalidContentActions': false,
        '$invalidOutputs': false,
        '$invalidCustomActions': false,
        '$invalid': false
      }
    };
  }
};
