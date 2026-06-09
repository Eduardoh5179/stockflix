export interface Setor {
    id: number;
    nome: string;
    estoqueId: number;
    ativo: boolean;
}

const url = import.meta.env.VITE_API_URL;


export default async function ativarSetor(id: number): Promise<Setor> {
    try {
        const response = await fetch(`${url}/setores/ativar/${id}`, {
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
        const setorAtualizado = textoResposta ? JSON.parse(textoResposta) : null;
        return setorAtualizado

    } catch (error) {
        console.error('Erro na requisição PUT:', error);
        throw error;
    }
}