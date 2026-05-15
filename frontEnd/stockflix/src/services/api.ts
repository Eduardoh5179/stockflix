const api = import.meta.env.VITE_API_URL


export const getProdutos = async () => {
  const response = await fetch(`${api}/produtos`); 
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
};