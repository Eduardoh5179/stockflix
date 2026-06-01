import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import { useState, useEffect } from 'react'
import { Box, TriangleAlert, ArrowDownRight, TrendingUp } from 'lucide-react'
import { type Produto } from '../data/constants.ts'
import produtosApi from '../services/api.ts'
import movimentacoes from '../services/movimentacoes.ts'
import { Link,useNavigate } from 'react-router-dom'
import { type Movimentacao } from '../data/movimentacao.ts'


function Dashboard() {

  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaMovimentacoes, setListaMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalQuantidade = listaProdutos.reduce((acumulador, item) => acumulador + item.quantidade, 0);
  const totalPreco = listaProdutos.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0);
  const top3EstoqueCritico = [...listaProdutos].sort((a, b) => a.quantidade - b.quantidade).slice(0, 3);
  const topItensSaida = Object.values(listaMovimentacoes.filter((mov) => mov.tipoMovimentacao === false).reduce((acc, mov) => {
    if (!acc[mov.produtoId]) {
      const produtoNome = listaProdutos.find((p) => p.id === mov.produtoId)?.nome || `Produto ${mov.produtoId}`;
      acc[mov.produtoId] = { nome: produtoNome, total: 0 };
    }
    acc[mov.produtoId].total += mov.qtdMovimentada;
    return acc;
  }, {} as Record<number, { nome: string; total: number }>)
  ).sort((a, b) => b.total - a.total).slice(0, 3);

  useEffect(() => {
    const carregarDadosDaApi = async () => {
      setLoading(true)
      try {
        const dados = await produtosApi();

        setListaProdutos(dados);

      } catch (error) {
        console.error("Erro ao carregar os produtos na tela:", error);
        navigate('/ErrorService')
      } finally {
        setLoading(false)
      }
    };

    carregarDadosDaApi();
  }, []);

  useEffect(() => {
    const carregarDadosDaApi = async () => {
      try {
        const dados = await movimentacoes();

        setListaMovimentacoes(dados);

      } catch (error) {
        console.error("Erro ao carregar os produtos na tela:", error);
      }
    };

    carregarDadosDaApi();
  }, []);

  const totalSaidas = listaMovimentacoes.filter(mov => mov.tipoMovimentacao === false).reduce((soma, mov) => soma + mov.qtdMovimentada, 0);


  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1 '>
          <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>
            <section className='mb-6'>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight dark:text-zinc-100">Visão geral do estoque</h2>
              <p className='text-zinc-500 text-md dark:text-zinc-400'>Monitoramento de níveis e alertas críticos</p>
            </section>
            <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6 dark:bg-zinc-900 dark:border-zinc-800'>
                <div className=' flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2 dark:bg-zinc-800 dark:text-zinc-200'>
                    <Box size={20} />
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900 '>
                    +2%
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600 dark:text-zinc-300'>ITENS TOTAIS</p>
                  <p className='text-gray-800 font-bold dark:text-zinc-100'>{totalQuantidade}</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6 dark:bg-zinc-900 dark:border-zinc-800'>
                <div className='flex items-center justify-between '>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2 dark:bg-zinc-800 dark:text-zinc-200'>
                    <TriangleAlert size={20} />
                  </div>
                  <div className='text-[0.7rem] p-0.5 px-2 rounded-lg font-bold bg-red-200 text-red-800 dark:bg-red-400 dark:text-red-900'>
                    crítico
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600 dark:text-zinc-300'>ABAIXO DO ESPERADO</p>
                  <p className='text-gray-800 font-bold dark:text-zinc-100'>2</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6 dark:bg-zinc-900 dark:border-zinc-800'> {/*Saidas <ArrowDownRight size={20}/></*/}
                <div className='flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2 dark:bg-zinc-800 dark:text-zinc-200'>
                    <ArrowDownRight size={20} />
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900'>
                    -5%
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600 dark:text-zinc-300'>SAIDAS</p>
                  <p className='text-gray-800 font-bold dark:text-zinc-100'>{totalSaidas}</p>
                </div>
              </div>
              <div className='border flex  flex-col gap-2 border-(--borderColor) shadow-sm rounded-md p-6 dark:bg-zinc-900 dark:border-zinc-800'> {/*valor total trendingup*/}
                <div className='flex items-center justify-between'>
                  <div className='bg-zinc-200 text-gray-800 w-fit rounded-sm p-2 dark:bg-zinc-800 dark:text-zinc-200'>
                    <TrendingUp size={20} />
                  </div>
                  <div className='text-[0.7rem] font-bold p-0.5 px-2 rounded-lg bg-green-300 text-green-900'>
                    +12%
                  </div>
                </div>
                <div className='font-mono'>
                  <p className='text-zinc-600 dark:text-zinc-300'>VALOR TOTAL</p>
                  <p className='text-gray-800 font-bold dark:text-zinc-100'>{totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              </div>


            </section>

            <section className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6'>
              <section className=' lg:col-span-3 border border-zinc-300 rounded-lg p-6 dark:bg-zinc-900 dark:border-zinc-800'>
                <section className='mb-2 flex justify-between'>
                  <h2 className='font-bold'> <span className='text-red-500 text-bold '> • </span>Alerta de reposição </h2>
                  <p className='text-[0.7rem] p-0.5 px-2 flex items-center justify-center rounded-lg font-bold bg-red-200 text-red-800 dark:bg-red-400 dark:text-red-900'> 3 itens críticos </p>
                </section>
                <section className='overflow-x-auto'>
                  <table className="min-w-full divide-y divide-gray-200 bg-white text-sm dark:bg-zinc-900">
                    <thead className="bg-gray-50 dark:bg-zinc-800 transition-colors">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Produto</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200 ">ID</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Preço</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Setor</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Qtd.</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Ações</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">

                      {loading ? (
                        Array.from({ length: 3 }).map((_, rowIndex) => (
                          <tr key={`loading-row-${rowIndex}`} className="hover:bg-gray-50 transition-colors dark:bg-zinc-900 dark:hover:bg-zinc-800/50">
                            {Array.from({ length: 6 }).map((_, colIndex) => {
                              const randomWidth = `${Math.floor(Math.random() * 56) + 40}%`;

                              return (
                                <td key={`loading-cell-${rowIndex}-${colIndex}`} className="px-4 py-3 h-10">
                                  <div
                                    className="bg-zinc-200 h-full rounded-md animate-pulse dark:bg-zinc-700"
                                    style={{ width: randomWidth }}
                                  ></div>
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      ) : (
                        top3EstoqueCritico.slice(0, 3).map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors dark:hover:bg-zinc-800/30">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-300">{item.nome}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-zinc-300">{item.id}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-zinc-300">{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-zinc-300">{item.setorId}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-zinc-300">{item.quantidade}</td>
                            <td className="px-4 py-3 text-right">
                              <Link to={`/Products/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium underline dark:bg-zinc-900 dark:text-blue-400 dark:hover:text-blue-300">
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </section>
              </section>
              <section className='lg-col-span-1 border border-zinc-300 rounded-lg p-6 dark:bg-zinc-900 dark:border-zinc-800'>
                <h2 className='font-bold text-md font-sans'>Top Itens (saida)</h2>
                <ul className='mt-2 flex flex-col gap-3'>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => {
                      const widths = ['w-24', 'w-32', 'w-28'];
                      const widthClass = widths[index % widths.length];
                      return (
                        <li key={`loading-item-${index}`} className='flex justify-between items-center h-5'>
                          <div className={`bg-zinc-200 ${widthClass} h-4 rounded-md animate-pulse`}></div>
                          <div className='bg-zinc-200 w-12 h-4 rounded-md animate-pulse'></div>
                        </li>
                      );
                    })
                  ) : (
                    <>
                      {topItensSaida.map((item, index) => (
                        <li key={index} className='flex justify-between'>
                          <p className='text-sm capitalize'>{item.nome}</p>
                          <p className='font-bold text-sm'>{item.total} un.</p>
                        </li>
                      ))}

                      {topItensSaida.length === 0 && (
                        <p className="text-sm text-zinc-500 italic">Nenhuma saída registrada.</p>
                      )}
                    </>
                  )}
                </ul>
              </section>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard