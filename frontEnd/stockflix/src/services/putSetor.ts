export interface Setor {
    id: number;
    nome: string;
    estoqueId: number
}
const url = import.meta.env.VITE_API_URL;

export default async function atualizarSetor(id: number, dados: Setor): Promise<Setor> {
  try {
    const response = await fetch(`${url}/setores/${id}`, {
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


    const setorAtualizado = await response.json();
    return setorAtualizado;

  } catch (error) {
    console.error('Erro na requisição PUT:', error);

    throw error; 
  }
}