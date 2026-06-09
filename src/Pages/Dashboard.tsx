import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import {useState} from 'react'
import { Box, TriangleAlert,ArrowDownRight,TrendingUp } from 'lucide-react'
import { produtos, type Produto } from '../data/constants.ts';
import { Link } from 'react-router-dom'


function Dashboard() {
  const [sidebarOpen, setsidebarOpen] = useState(true)

  return (
    <>
      <div className="flex flex-col min-h-screen">

      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64': 'md:ml-0'} transition-all duration-300 p-6`}>
            <section className='mb-6'>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Visão geral do estoque</h2>
              <p className='text-zinc-500 text-md'>Monitoramento de níveis e alertas críticos</p>
            </section>
            <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6'>
                <div className=' flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2'>
                    <Box size={20} />
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900'>
                    +2%
                  </div>
                  </div>
                <div className='font-mono'>
                  <p className='text-zinc-600'>ITENS TOTAIS</p>
                  <p className='text-gray-800 font-bold'>983029</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6'>
                <div className='flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2'>
                    <TriangleAlert size={20}/>
                  </div>
                  <div className='text-[0.7rem] p-0.5 px-2 rounded-lg font-bold bg-red-200 text-red-800'>
                    crítico
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600'>ABAIXO DO ESPERADO</p>
                  <p className='text-gray-800 font-bold'>231</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6'> {/*Saidas <ArrowDownRight size={20}/></*/}
                <div className='flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2'>
                    <ArrowDownRight size={20}/>
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900'>
                    -5%
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600'>SAIDAS</p>
                  <p className='text-gray-800 font-bold'>24</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6'> {/*valor total trendingup*/ }
                <div className='flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2'>
                    <TrendingUp size={20}/>
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900'>
                    +12%
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600'>VALOR TOTAL</p>
                  <p className='text-gray-800 font-bold'>R$84k</p>
                </div>
              </div>
              
              
            </section>
            
            <section className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6'>
              <section className=' lg:col-span-3 border border-zinc-300 rounded-lg p-6 '>
                <section className='mb-2 flex justify-between'>
                  <h2 className='font-bold'> <span className='text-red-500 text-bold '> • </span>Alerta de reposição </h2>
                  <p className='text-[0.7rem] p-0.5 px-2 flex items-center justify-center rounded-lg font-bold bg-red-200 text-red-800'> 3 itens críticos </p>
                </section>
                <section className='overflow-x-auto'>
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
                </section>
              </section>
              <section className='lg-col-span-1 border border-zinc-300 rounded-lg p-6'>
                 <h2 className='font-bold text-md font-sans'>Top Itens (saida)</h2>
                 <ul className='mt-2 flex flex-col gap-3'>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Celular galaxy</p>
                    <p className='font-bold text-sm'>123 un.</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>Notebook pro</p>
                    <p className='font-bold text-sm'>92 un.</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm'>fone bluetooth</p>
                    <p className='font-bold text-sm'>80 un.</p>
                  </div>
                 </ul>
              </section>
            </section>
          </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Dashboard