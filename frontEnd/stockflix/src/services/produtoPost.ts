const API_URL = import.meta.env.VITE_API_URL;

export interface NovoProdutoData {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    descricao: string;
    setorId: number;
}

export const produtoService = {
    criar: async (dadosProduto: NovoProdutoData): Promise<void> => {
        const response = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dadosProduto),
        });

        if (!response.ok) {

            const dadosErro = await response.json().catch(() => null);
            console.error("❌ Detalhes do erro vindos da API:", dadosErro);

            throw new Error(
                dadosErro?.mensagem || `Erro na API: ${response.status} - ${response.statusText}`
            );
        }
    }
};