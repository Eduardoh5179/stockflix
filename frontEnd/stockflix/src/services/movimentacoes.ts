  const movimentacoes = async () => {
    const url = import.meta.env.VITE_API_URL;
    const enderecoCompleto = `${url}/movimentacoes`;
    console.log("movimentações de:", `${enderecoCompleto}`);

    try {
      const response = await fetch(enderecoCompleto, {
      method: 'GET', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      }
    });
      console.log(" Status da Resposta:", response.status);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const dados = await response.json();
      
      console.log(" DADOS RECEBIDOS COM SUCESSO:");
      console.table(dados); 
      return dados

    } catch (error) {
      console.error(" FALHA NO TESTE DE CONEXÃO:");
      console.error(error);
      return []
    }
  };

export default movimentacoes
