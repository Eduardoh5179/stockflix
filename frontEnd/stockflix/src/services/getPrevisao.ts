  const getPrevisao = async () => {
    const url = import.meta.env.VITE_API_URL;
    const enderecoCompleto = `${url}/previsoes`;

    try {
      const response = await fetch(enderecoCompleto, {
      method: 'GET', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      }
    });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const dados = await response.json();
      return dados

    } catch (error) {
      console.error(" FALHA NO TESTE DE CONEXÃO:");
      console.error(error);
      return []
    }
  };

export default getPrevisao