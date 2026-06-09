export interface Usuario {
    id: number,
    login: string,
    senha: string,
    acessoADM: boolean,
    ativo: boolean
}

const url = import.meta.env.VITE_API_URL;


export default async function ativarUsuario(id: number): Promise<Usuario> {
    try {
        const response = await fetch(`${url}/usuarios/ativar/${id}`, {
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