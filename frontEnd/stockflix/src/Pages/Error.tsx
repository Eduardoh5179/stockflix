import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState } from 'react';
import { SearchX } from 'lucide-react';

function Error() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1 dark:bg-zinc-950'>
          <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
            <div className="flex flex-col items-center justify-center min-h-[65vh] px-6 text-center bg-white border border-(--borderColor) rounded-xl p-12 shadow-sm max-w-2xl mx-auto my-8 dark:bg-zinc-900 dark:border-zinc-800">

              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-violet-50 text-red-400 rounded-full dark:bg-red-500/10 dark:text-red-400">
                <SearchX size={45}/>
              </div>

              <span className="text-5xl font-black text-zinc-800 tracking-tight mb-2 dark:text-zinc-100">404</span>
              <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight dark:text-zinc-200">
                Página não encontrada
              </h1>
              <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed dark:text-zinc-400">
                O item que você está tentando acessar não existe no sistema, foi removido permanentemente ou está incorreto.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Error