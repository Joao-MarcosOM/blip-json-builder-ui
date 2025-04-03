
export const generateJsonBuilder = async (formData: FormData) => {
  try {
    // Set up base URL - use environment-specific endpoint
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://127.0.0.1:8080' 
      : 'https://api.example.com'; // Replace with your actual production API URL
    
    // For demo/testing purposes when API is not available
    if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
      // Return mock data when not in local development
      console.log('Using mock data since we are not in local development');
      return mockJsonBuilderResponse();
    }

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
    
    // Add more detailed error message for debugging
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      // If we're not in local development but trying to access localhost
      if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
        console.log('Using mock data due to connection error');
        return mockJsonBuilderResponse();
      } else {
        throw new Error(
          'Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://127.0.0.1:8080 e tente novamente.'
        );
      }
    }
    
    // Rethrow the error with more context
    throw error;
  }
};

// Mock response function for testing/demo purposes
function mockJsonBuilderResponse() {
  return {
    "builder": {
      "type": "standard",
      "id": "mockJson12345",
      "name": "Example Builder",
      "version": "1.0",
      "items": [
        {
          "id": "welcomeMessage",
          "type": "message",
          "content": "Bem-vindo ao nosso assistente!",
          "position": {
            "x": 100,
            "y": 50
          }
        },
        {
          "id": "userInput",
          "type": "input",
          "label": "Nome",
          "placeholder": "Digite seu nome",
          "validation": {
            "required": true
          },
          "position": {
            "x": 100,
            "y": 150
          }
        },
        {
          "id": "submitButton",
          "type": "button",
          "label": "Enviar",
          "action": {
            "type": "submit"
          },
          "position": {
            "x": 100,
            "y": 250
          }
        }
      ],
      "connections": [
        {
          "source": "welcomeMessage",
          "target": "userInput"
        },
        {
          "source": "userInput",
          "target": "submitButton"
        }
      ]
    }
  };
}
