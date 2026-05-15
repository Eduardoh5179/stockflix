import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import { Search,SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
// import { produtos } from '../data/constants.ts'
import { type Produto} from '../data/constants.ts'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import produtosJson from '../data/products.json'

function Home() {

  const { user } = useAuth();

  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [busca, setBusca] = useState("");

  const [listaProdutos, setListaProdutos] = useState<Produto[]>([])

  useEffect(() => {
    setListaProdutos(produtosJson);
  }, []);

  useEffect(() => {
  const testarConexao = async () => {
    const url = import.meta.env.VITE_API_URL;
    // const porta = import.meta.env.VITE_API_PORT;
    const enderecoCompleto = `${url}/setores`;
    console.log(" Tentando conectar em:", `${enderecoCompleto}`);

    try {
      const response = await fetch(`${enderecoCompleto}`);
      console.log(" Status da Resposta:", response.status);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const dados = await response.json();
      
      console.log(" DADOS RECEBIDOS COM SUCESSO:");
      console.table(dados); 

    } catch (error) {
      console.error(" FALHA NO TESTE DE CONEXÃO:");
      console.error(error);
    }
  };

  testarConexao();
}, []);

  const produtosFiltrados = listaProdutos.filter((produto) => {
  const termo = busca.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) || 
      produto.id.toString().includes(termo)
    );
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
       <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
       <Sidebar isOpen={sidebarOpen} />
       <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64': 'md:ml-0'} transition-all duration-300 p-6`}>

            <div className="flex flex-col gap-6 ">

              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Estoque</h1>
              </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
                    <div className="flex flex-1 gap-2 max-w-xl"> 
                      <div className="relative flex-1 group">
                        <input type="text" placeholder="Buscar item ou código..." value={busca} onChange={(e)=>{setBusca(e.target.value)}} className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none hover:border-gray-300" />
                        <button type="button" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 border-l border-gray-200 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200 cursor-pointer rounded-r-xl">
                          <Search size={19} strokeWidth={2.2} />
                        </button>
                      </div>

                      <button type="button" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 cursor-pointer active:bg-gray-100">
                        <SlidersHorizontal size={19} strokeWidth={2.2} />
                        <span className="hidden md:block">Filtrar por</span>
                      </button>
                    </div>                  
                  {user?.role === "admin"  && (
                  <Link to={'/Create'} className="flex items-center w-50 md:w-auto gap-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg ">
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
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Qtd.</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-900">Ações</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {produtosFiltrados.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{item.nome}</td>
                            <td className="px-4 py-3 text-gray-700">{item.id}</td>
                            <td className="px-4 py-3 text-gray-700">{item.preco}</td>
                            <td className="px-4 py-3 text-gray-700">{item.quantidade}</td>
                            <td className="px-4 py-3 text-right">
                              <Link to={`/Products/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium underline">
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
              </div>
            </div>
          </section>
       </main>
       <Footer/>
      </div>
    </>
  )
}

export default Home