export interface Usuario {
    id: number;
    login: string;
    senha: string;
    acessoADM: boolean;
    ativo: boolean;
}
const url = import.meta.env.VITE_API_URL;

export async function atualizarUsuario(id: number, dados: Usuario): Promise<Usuario> {
  try {
    const response = await fetch(`${url}/usuarios/${id}`, {
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

    const usuarioAtualizado = await response.json();
    return usuarioAtualizado;

  } catch (error) {
    console.error('Erro na requisição PUT:', error);

    throw error; 
  }
}