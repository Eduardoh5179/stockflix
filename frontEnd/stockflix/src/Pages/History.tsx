import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import movimentacoes from '../services/movimentacoes.ts'
import { useNavigate } from 'react-router-dom'


function History() {
  const { user } = useAuth();
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface Movimentacao {
    id: number;
    data: string;
    produtoId: number;
    qtdMovimentada: number;
    tipoMovimentacao: boolean;
    usuarioId: number;
    produtoNome: string;
    usuarioNome: string
  }
  const [listaMovement, setMovement] = useState<Movimentacao[]>([]);

  useEffect(() => {
    const carregarDadosDaApi = async () => {
      setLoading(true);
      try {
        const dados = await movimentacoes();

        setMovement(dados);

      } catch (error) {
        console.error("Erro ao carregar os produtos na tela:", error);
        navigate('/ErrorService');
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDaApi();
  }, []);
  if (!user) return null;
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1 transition-colors'>
          <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight dark:text-zinc-100">Histórico de movimentações</h2>
            <section className='mt-6 overflow-x-auto'>
              <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200 border-l-none">Tipo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Produto</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Qtd</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Mov.</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Operador</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 duration-300">
                  {/* <tr>
                        <td className="px-4 py-3 text-gray-700">Entrada</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">Parafuso Sextavado</td>
                        <td className="px-4 py-3 text-gray-700">500</td>
                        <td className="px-4 py-3 text-gray-700">Compra do fornecedor </td>
                        <td className="px-4 py-3 text-gray-700">Carlos Silva</td>
                        <td className="px-4 py-3 text-right text-gray-700">09/04/2026</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Saída</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">Chave de Fenda PH2</td>
                        <td className="px-4 py-3 text-gray-700">12</td>
                        <td className="px-4 py-3 text-gray-700">Venda</td>
                        <td className="px-4 py-3 text-gray-700">Ana Souza</td>
                        <td className="px-4 py-3 text-right text-gray-700">08/04/2026</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">Ajuste</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">Tinta Latéx Branca</td>
                        <td className="px-4 py-3 text-gray-700">2</td>
                        <td className="px-4 py-3 text-gray-700">Avaria</td>
                        <td className="px-4 py-3 text-gray-700">Marcos Lima</td>
                        <td className="px-4 py-3 text-right text-gray-700">07/04/2026</td>
                      </tr> */}
                  {loading ? (
                    Array.from({ length: 5 }).map((_, rowIndex) => (
                      <tr key={`loading-row-${rowIndex}`} className="hover:bg-gray-50 transition-colors dark:bg-zinc-900 dark:hover:bg-zinc-800/50 ">
                        {Array.from({ length: 6 }).map((_, colIndex) => {
                          const randomWidth = `${Math.floor(Math.random() * 56) + 40}%`;

                          return (
                            <td key={`loading-cell-${rowIndex}-${colIndex}`} className="px-4 py-3 h-10">
                              <div
                                className="bg-zinc-200 h-full dark:bg-zinc-700 rounded-md animate-pulse"
                                style={{ width: randomWidth }}
                              ></div>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    listaMovement.toReversed().map((mov) => (
                      <tr key={mov.id} className='dark:hover:bg-zinc-800/30'>
                        <td className={`px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300 border-l-3 ${mov.tipoMovimentacao ? "border-green-500" : "border-red-500"} `}>
                          {mov.tipoMovimentacao ? "Entrada" : "Saída"}
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium dark:bg-zinc-900 dark:text-zinc-300">
                          {mov.produtoNome}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                          {mov.qtdMovimentada}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                          -
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                          {mov.usuarioNome}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                          {new Date(mov.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default History