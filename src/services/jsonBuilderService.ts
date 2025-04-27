export const generateJsonBuilder = async (formData: FormData, type: 'full' | 'blocks') => {
  try {
    // Define base URL dinamicamente (pode usar variável de ambiente no futuro)
    const isLocalhost = window.location.hostname === 'localhost';
    const baseUrl = isLocalhost
      ? 'http://127.0.0.1:8080'
      : 'http://127.0.0.1:8080'; // Substitua pela URL real em produção

      console.log('Enrou');


      const endpoint = type === 'full' 
      ? `${baseUrl}/builderJson/generateBuilder`
      : `${baseUrl}/builderJson/generateBlocks`;

    console.log('Fazendo requisição para:', endpoint);

    // Loga conteúdo do formData para debug
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Configuração da requisição
    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    };

    // Faz a requisição
    const response = await fetch(endpoint, requestOptions);

    console.log('Resposta recebida:', response);

    // Trata erro de status HTTP
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP: ${response.status} - ${errorText || response.statusText}`);
    }

    // Parse do JSON
    const result = await response.json();
    console.log('Resposta JSON:', result);
    return result;

  } catch (error: any) {
    console.error('Erro na API:', error);

    // Trata erro de rede
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se ele está rodando em http://127.0.0.1:8080 e se o CORS está corretamente configurado.'
      );
    }

    // Repassa outros erros
    throw error;
  }
};
