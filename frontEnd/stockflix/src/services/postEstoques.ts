const API_URL = import.meta.env.VITE_API_URL;

export interface novoEstoque {
    id: number;
    nome: string;
    ativo: boolean
}

export const criarEstoque = {
    criar: async (dadosProduto: novoEstoque): Promise<void> => {
        const response = await fetch(`${API_URL}/estoques`, {
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