import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import {useState} from 'react'

function Create() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
    <div className="flex flex-col min-h-screen">

      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'ml-64': 'ml-0'} transition-all duration-300 p-6`}>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Criar novo produto</h1>

              <section className='mt-4 space-y-4'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold font-sans text-slate-800'>Nome do produto </label>
                  <input type="text" placeholder='digite o nome do produto' className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'/>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold font-sans text-slate-800'>Descrição do Produto </label>
                  <textarea placeholder='digite a descrição do produto' className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></textarea>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold font-sans text-slate-800'>Defina a quantidade minima do produto </label>
                  <input type="number" placeholder='determine a quantidade minima do produto' className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold font-sans text-slate-800'>Preço do produto(Reais)</label>
                  <input type='number' placeholder='determine o preço do produto' className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></input>
                </div>
                <div className='flex justify-center'>
                <button type='submit' className='px-4 py-2  rounded-md cursor-pointer bg-green-500 hover:bg-green-600 text-white text-md font-bold transition-colors'>
                  Criar produto
                </button>
                </div>
              </section>
          </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Create