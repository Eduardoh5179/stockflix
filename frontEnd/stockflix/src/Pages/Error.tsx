import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

function Error() {
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
                <SearchX size={45}/>
              </div>

              <span className="text-5xl font-black text-zinc-800 tracking-tight mb-2">404</span>
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
                Página não encontrada
              </h1>
              <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
                O item que você está tentando acessar não existe no sistema, foi removido permanentemente ou o link está incorreto.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <Link to="/" className="w-full sm:w-auto px-5 py-2.5 bg-violet-600 text-white font-medium text-sm rounded-xl hover:bg-violet-700 active:bg-violet-800 text-center transition-all shadow-sm shadow-violet-100 flex items-center justify-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Voltar 
                </Link>
              </div>

            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Error