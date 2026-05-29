import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import {useState} from 'react'
import {type FormEvent} from 'react'

export function Create() {
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setorId, setSetorId] = useState('1'); 
  const [preco, setPreco] = useState('');

  const url = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${url}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const dadosErro = await response.json();
        console.error("❌ Detalhes do erro vindos da API:", dadosErro);
        throw new Error(`Erro na API: ${response.status} - ${dadosErro}`);
      }

      alert('Produto criado com sucesso!');
      
      setNome('');
      setDescricao('');
      setSetorId('1');
      setPreco('');

    } catch (error) {
      console.error('Erro na requisição POST:', error);
      alert('Houve um erro ao tentar criar o produto.');
    }
  };
  return (
    <>
    <div className="flex flex-col min-h-screen">

      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'md:ml-64': 'md:ml-0'} transition-all duration-300 p-6`}>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Criar novo produto</h1>

              <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold font-sans text-slate-800'>Nome do produto </label>
                  <input type="text" placeholder='digite o nome do produto' value={nome} onChange={(e) => setNome(e.target.value)} required className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'/>
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
                  <label className='font-semibold font-sans text-slate-800'>Preço do produto(Reais)</label>
                  <input type='number' placeholder='determine o preço do produto' step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required className='px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400'></input>
                </div>
                <div className='flex justify-center'>
                <button type='submit' className='px-4 py-2  rounded-md cursor-pointer bg-green-500 hover:bg-green-600 text-white text-md font-bold transition-colors'>
                  Criar produto
                </button>
                </div>
              </form>
          </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Create