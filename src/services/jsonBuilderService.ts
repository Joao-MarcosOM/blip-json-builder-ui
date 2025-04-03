
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    // Set up base URL - use environment-specific endpoint
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://127.0.0.1:8080' 
      : 'http://127.0.0.1:8080'; // Always use local API for now
    
    console.log('Making API request to:', `${baseUrl}/builderJson/generateBuilder`);
    
    // Create custom fetch options to handle CORS properly
    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      // Using 'same-origin' for localhost or omit for cross-origin
      credentials: 'include' as RequestCredentials,
      mode: 'cors' as RequestMode,
    };
    
    // Attempt the fetch with our custom options
    const response = await fetch(`${baseUrl}/builderJson/generateBuilder`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText || response.statusText}`);
    }

    // Parse and return the response
    const result = await response.json();
    console.log('API Response received:', result);
    return result;
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
