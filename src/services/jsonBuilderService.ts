
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    // Set up base URL - use environment-specific endpoint
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://127.0.0.1:8080' 
      : 'http://127.0.0.1:8080'; // Always use local API for now
    
    console.log('Making API request to:', `${baseUrl}/builderJson/generateBuilder`);
    
    const response = await fetch(`${baseUrl}/builderJson/generateBuilder`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      // Add credentials to handle CORS properly
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText || response.statusText}`);
    }

    // Return the actual response from the API
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    // Specific error message for network-related issues
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://127.0.0.1:8080 e tente novamente.');
    }
    
    // Rethrow the error so we can handle it properly
    throw error;
  }
};
