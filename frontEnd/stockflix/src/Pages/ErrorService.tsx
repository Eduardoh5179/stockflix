import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState } from 'react';
import { CircleX } from 'lucide-react';

function ErrorService() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
            <div className="flex flex-col items-center justify-center min-h-[65vh] px-6 text-center bg-white border border-(--borderColor) rounded-xl p-12 shadow-sm max-w-2xl mx-auto my-8">

              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-violet-50 text-red-400 rounded-full ">
                <CircleX size={45}/>
              </div>

              <span className="text-5xl font-black text-zinc-800 tracking-tight mb-2">500</span>
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
                Houve um erro ao carregar os dados
              </h1>
              <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
                Ocorreu um erro inesperado ao nos comunicarmos com o servidor. Por favor, tente atualizar a página ou reiniciar sua internet.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              </div>

            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ErrorService