const url = import.meta.env.VITE_API_URL;

export const deleteEstoque = {
  deletar: async (id: number): Promise<void> => {
    const response = await fetch(`${url}/estoques/desativar/${id}`, {
      method: 'DELETE',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Não foi possível deletar o item no servidor.');
    }
  },
};