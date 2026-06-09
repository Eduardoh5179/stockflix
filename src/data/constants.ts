export interface Produto {
  id: number;
  nome: string;
  preco: string;
  quantidade: number;
}

export const produtos: Produto[] = [
  { id: 101, nome: "Smartphone Galaxy", preco: "R$ 2.500,00", quantidade: 15 },
  { id: 102, nome: "Notebook Pro", preco: "R$ 5.800,00", quantidade: 8 },
  { id: 103, nome: "Fone Bluetooth", preco: "R$ 290,00", quantidade: 42 },
];