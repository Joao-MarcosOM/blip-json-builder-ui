
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    const response = await fetch('http://127.0.0.1:8080/builderJson/generateBuilder', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    // Return the actual response from the API
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Rethrow the error so it can be handled by the component
    throw error;
  }
};
