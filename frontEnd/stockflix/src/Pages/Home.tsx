import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { type Produto } from '../data/constants.ts'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import produtosApi from '../services/api.ts'
import { produtoService } from '../services/produtoDelete.ts'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


function Home() {

  const { user } = useAuth();

  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  const [listaProdutos, setListaProdutos] = useState<Produto[]>([])
  const [setorSelecionado, setSetorSelecionado] = useState<string>("todos");
  const [ordenacao, setOrdenacao] = useState<string>("nenhum");

  useEffect(() => {
    const carregarDadosDaApi = async () => {
      setLoading(true)
      try {
        const dados = await produtosApi();

        setListaProdutos(dados);

      } catch (error) {
        console.error("Erro ao carregar os produtos na tela:", error);
      } finally {
        setLoading(false)
      }
    };

    carregarDadosDaApi();
  }, []);

  const handleDelete = async (id: number, quantidade: number) => {
    if (quantidade > 0) {
      toast.warning(`Não é possível deletar este produto pois ele ainda possui ${quantidade} unidades em estoque! Zere o estoque antes de excluir.`);
      return;
    }

    // 2. Confirmação do usuário
    const confirmar = window.confirm("Tem certeza que deseja deletar este item?");
    if (!confirmar) return;

    try {
      await produtoService.deletar(id);

      toast.success("Item deletado com sucesso!");


    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao tentar excluir o item.");
    }
  };


  const produtosFiltrados = listaProdutos.filter((produto) => {
    const termo = busca.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) ||
      produto.id.toString().includes(termo)
    );
  }).filter((produto) => {
    if (setorSelecionado === "todos") return true;
    return produto.setorId.toString() === setorSelecionado;
  }).sort((a, b) => {
    switch (ordenacao) {
      case "preco-crescente":
        return a.preco - b.preco;
      case "preco-decrescente":
        return b.preco - a.preco;
      case "qtd-crescente":
        return a.quantidade - b.quantidade;
      case "qtd-decrescente":
        return b.quantidade - a.quantidade;
      default:
        return 0;
    }
  });
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              title: 'text-slate-950 font-semibold',
              description: '!text-slate-500 font-normal',


              success: 'bg-white border border-green-200 group success',
              warning: 'bg-white border border-amber-200 group warning',

              icon: 'group-[.success]:text-green-600 group-[.warning]:text-amber-500',
            },
          }}
        />
        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>

            <div className="flex flex-col gap-6 ">

              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Estoque</h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
                <div className="flex flex-1 gap-2 max-w-xl">
                  <div className="relative flex-1 group">
                    <input type="text" placeholder="Buscar item ou código..." value={busca} onChange={(e) => { setBusca(e.target.value) }} className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none hover:border-gray-300" />
                    <button type="button" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 border-l border-gray-200 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer rounded-r-xl">
                      <Search size={19} strokeWidth={2.2} />
                    </button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 cursor-pointer active:bg-gray-100">
                        <SlidersHorizontal size={19} strokeWidth={2.2} />
                        <span className="hidden md:block">Filtrar por</span>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-106.25`">
                      <DialogHeader>
                        <DialogTitle>Filtrar por</DialogTitle>
                        <DialogDescription>
                          Defina os filtros a serem aplicados para a pesquisa
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-2">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">Setor</label>
                          <select value={setorSelecionado} onChange={(e) => setSetorSelecionado(e.target.value)} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                            <option value="todos">Todos os Setores</option>
                            <option value="1">Setor 1 (Ex: Eletrônicos)</option>
                            <option value="2">Setor 2 (Ex: Vestuário)</option>
                            <option value="3">Setor 3 (Ex: Alimentos)</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">Ordenar por</label>
                          <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                            <option value="nenhum">Padrão</option>
                            <option value="preco-crescente">Preço: Menor para o Maior</option>
                            <option value="preco-decrescente">Preço: Maior para o Menor</option>
                            <option value="qtd-crescente">Quantidade: Menor para o Maior</option>
                            <option value="qtd-decrescente">Quantidade: Maior para o Menor</option>
                          </select>
                        </div>

                        <DialogFooter className="pt-4 gap-2 sm:gap-0">
                          <button type="button" onClick={() => { setSetorSelecionado("todos"); setOrdenacao("nenhum"); }} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 active:bg-gray-50 rounded-lg">
                            Limpar
                          </button>

                          <DialogClose asChild>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg">
                              Aplicar
                            </button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {user?.acessoADM === true && (
                  <Link to={'/Create'} className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg ">
                    <span className="text-sm lg:text-lg">+</span>
                    Adicionar produto
                  </Link>
                )}
              </div>
            </div>
            <div>
              <div className="mt-4 border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Produto</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Preço</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Setor</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Qtd.</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, rowIndex) => (
                        <tr key={`loading-row-${rowIndex}`} className="hover:bg-gray-50 transition-colors">
                          {Array.from({ length: 6 }).map((_, colIndex) => {
                            const randomWidth = `${Math.floor(Math.random() * 56) + 40}%`;

                            return (
                              <td key={`loading-cell-${rowIndex}-${colIndex}`} className="px-4 py-3 h-10">
                                <div
                                  className="bg-zinc-200 h-full rounded-md animate-pulse"
                                  style={{ width: randomWidth }}
                                ></div>
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      produtosFiltrados.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{item.nome}</td>
                          <td className="px-4 py-3 text-gray-700">{item.id}</td>
                          <td className="px-4 py-3 text-gray-700">{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="px-4 py-3 text-gray-700">{item.setorId}</td>
                          <td className="px-4 py-3 text-gray-700">{item.quantidade}</td>
                          <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                            <Link to={`/Products/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium underline">
                              Ver detalhes
                            </Link>
                            {user?.acessoADM === true && (<div className='cursor-pointer' onClick={() => handleDelete(item.id, item.quantidade)}>
                              <Trash2 size={16} className='text-red-600' />
                            </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home