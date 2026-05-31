import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import { useState } from 'react'
import { type FormEvent } from 'react'
import { produtoService } from '../services/produtoPost.ts'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { CircleX } from 'lucide-react'

export function Create() {
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setorId, setSetorId] = useState('1');
  const [preco, setPreco] = useState('');
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requestBody = {
      id: 0,
      nome: nome,
      preco: Number(preco),
      quantidade: 0,
      descricao: descricao,
      setorId: Number(setorId)
    };

    try {
      await produtoService.criar(requestBody);
      toast.success("Produto criado com sucesso!", {
        description: `O produto "${nome}" foi salvo no sistema.`,
      });
      setNome('');
      setDescricao('');
      setSetorId('1');
      setPreco('');

    } catch (error: any) {
      console.error('Erro na requisição POST:', error);
      const mensagem = "Houve um erro ao tentar criar o produto.";

      setErrorStatus(mensagem);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              success: 'bg-white border-green-200',
              title: 'text-slate-950 font-semibold',
              description: '!text-slate-500 font-normal',
              icon: 'text-green-600',
            },
          }}
        />
        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Criar novo produto</h1>

            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold font-sans text-slate-800'>Nome do produto </label>
                <input type="text" placeholder='digite o nome do produto' value={nome} onChange={(e) => setNome(e.target.value)} required className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold font-sans text-slate-800'>Descrição do Produto </label>
                <textarea placeholder='digite a descrição do produto' value={descricao} onChange={(e) => setDescricao(e.target.value)} required className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></textarea>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold font-sans text-slate-800'>Defina o setor do produto </label>
                <select value={setorId} onChange={(e) => setSetorId(e.target.value)} className='px-4 py-3 border  border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold font-sans text-slate-800'>Preço do produto (R$)</label>
                <input type='number' placeholder='determine o preço do produto' step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></input>
              </div>
              {errorStatus && (<div>
                <div className="bg-red-100 border px-3 py-2 rounded-xl overflow-x-hidden flex items-center w-fit">
                  <div className="flex gap-2 text-red-700 font-medium text-sm">
                    <CircleX size={16} className='shrink-0' />
                    <p className="wrap-break-word">
                      {errorStatus}
                    </p>
                  </div>
                </div>
              </div>)}
              <div className='flex justify-center'>
                <button type='submit' className='px-4 py-2  rounded-md cursor-pointer bg-green-500 hover:bg-green-600 text-white text-md font-bold transition-colors'>
                  Criar produto
                </button>
              </div>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Create