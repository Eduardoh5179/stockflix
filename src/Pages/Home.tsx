import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { produtos } from '../data/constants.ts'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';



function Home() {
  interface Produto{
    id:number;
    nome:string;
    preco:string;
    quantidade:number;
  }
  
  const { user } = useAuth();

  const [sidebarOpen, setsidebarOpen] = useState(true)

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
                  <div className="relative w-full max-w-sm group">
                    <input type="text" placeholder="Buscar item ou código..." className="relative w-full pl-4 pr-12 py-2 bg-white border z-0 border-(--borderColor) rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500  placeholder:text-gray-400 text-gray-700"/>
                    
                    <button type="button" className="absolute right-0 top-0 h-full w-11 flex items-center border-l border-(--borderColor) justify-center text-gray-400  cursor-pointer">
                      <Search size={18} strokeWidth={2.5} />
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
                        {produtos.map((item: Produto) => (
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