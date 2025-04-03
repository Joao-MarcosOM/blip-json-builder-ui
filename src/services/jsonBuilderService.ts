
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/builderJson/generateBuilder', {
      method: 'POST',
      body: formData,
      // Add headers to help with CORS issues
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText || response.statusText}`);
    }

    // Return the actual response from the API
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    // Add more detailed error message for debugging
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://127.0.0.1:8080 e tente novamente.'
      );
    }
    
    // Rethrow the error with more context
    throw error;
  }
};
