import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import {useState} from 'react'

function History() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
    <div className="flex flex-col min-h-screen">

      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64': 'md:ml-0'} transition-all duration-300 p-6`}>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Histórico de movimentações</h2>
              <section className='mt-6 overflow-x-auto'>
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Tipo</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Produto</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Qtd</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Mov.</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Operador</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-900">Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                      <tr>
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
                      </tr>
                    </tbody>
                    </table>
              </section>
          </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default History