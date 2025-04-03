
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    // Set up base URL - use environment-specific endpoint
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://127.0.0.1:8080' 
      : 'https://api.example.com'; // Replace with your actual production API URL
    
    console.log('Making API request to:', `${baseUrl}/builderJson/generateBuilder`);
    
    const response = await fetch(`${baseUrl}/builderJson/generateBuilder`, {
      method: 'POST',
      body: formData,
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
    
    // Don't use mock data, rethrow the error so we can handle it properly
    throw error;
  }
};
