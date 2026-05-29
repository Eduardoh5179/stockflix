import { type Produto } from "@/data/constants";

const url = import.meta.env.VITE_API_URL;

export default async function atualizarProduto(id: number, dados: Produto): Promise<Produto> {
  try {
    const response = await fetch(`${url}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const dadosErro = await response.json();
      console.error("❌ Detalhes do erro vindos da API:", dadosErro);
      throw new Error(`Erro na API: ${response.status}`);
    }


    const produtoAtualizado = await response.json();
    return produtoAtualizado;

  } catch (error) {
    console.error('Erro na requisição PUT:', error);

    throw error; 
  }
}