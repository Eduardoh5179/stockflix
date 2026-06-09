const API_URL = import.meta.env.VITE_API_URL;

export interface novaPrevisao {
  id: number,
  qtdPrevista: number,
  inicioPeriodo: string,
  fimPeriodo: string,
  criadoEm: string,
  produtoId: number,
  produtoNome: string,
}

export const criarPrevisao = {
    criar: async (dadosPrevisao: novaPrevisao): Promise<void> => {
        const response = await fetch(`${API_URL}/previsoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dadosPrevisao),
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