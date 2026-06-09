export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
  setorId:number;
  ativo:boolean;
}

const url = import.meta.env.VITE_API_URL;


export default async function ativarProduto(id: number): Promise<Produto> {
    try {
        const response = await fetch(`${url}/produtos/ativar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const dadosErro = await response.json();
            console.error("❌ Detalhes do erro vindos da API:", dadosErro);
            throw new Error(`Erro na API: ${response.status}`);
        }

        const textoResposta = await response.text();
        const usuarioAtualizado = textoResposta ? JSON.parse(textoResposta) : null;
        return usuarioAtualizado

    } catch (error) {
        console.error('Erro na requisição PUT:', error);
        throw error;
    }
}