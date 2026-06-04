const API_URL = import.meta.env.VITE_API_URL;

export interface novoUsuario {
    id: number;
    login: string;
    senha: string;
    acessoADM: boolean;
    ativo:boolean
}

export const criarUsuario = {
    criar: async (dadosProduto: novoUsuario): Promise<void> => {
        const response = await fetch(`${API_URL}/usuarios`, {
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