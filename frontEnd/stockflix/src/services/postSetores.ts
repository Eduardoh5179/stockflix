const API_URL = import.meta.env.VITE_API_URL;



export interface novoSetor {
    id: number;
    nome: string;
    estoqueId: number;
}

export const criarSetor = {
    criar: async (dadosProduto: novoSetor): Promise<void> => {
        const response = await fetch(`${API_URL}/setores`, {
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