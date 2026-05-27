  const produtosPorID = async (id:number) => {
    const url = import.meta.env.VITE_API_URL;

    const enderecoCompleto = `${url}/produtos/${id}`;
    console.log(" Tentando conectar em:", `${enderecoCompleto}`);

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
    
      console.table(dados); 
      return dados

    } catch (error) {
      console.error(" FALHA ao buscar o produto:");
      console.error(error);
      return null
    }
  };

export default produtosPorID