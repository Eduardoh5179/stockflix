import { useParams } from "react-router-dom"
import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import Movement from '../components/Movement.tsx'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { produtos, type Produto } from '../data/constants.ts'

const ProductDetail = () =>{
    const { id } = useParams<{ id: string}>();
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const { user } = useAuth();

    const [produto, setProduto] = useState<Produto | undefined>(() => 
        produtos.find(p => p.id === Number(id))
    );

    

    if (!produto) {
    return (
      <>
      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
        <section className={`${sidebarOpen ? 'ml-64': 'ml-0'} transition-all duration-300 p-6`}>
            <h2> ERRO </h2>
        </section>  
      </main>
      </>
    );
  }

    const atualizarEstoquePai = (novaQuantidade: number) => {
            if (produto) {
                setProduto({ ...produto, quantidade: novaQuantidade });
            }
        };


    return(
        <> 
        <div className="flex flex-col min-h-screen">
            <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
            <Sidebar isOpen={sidebarOpen}/>
            <main className='h-full flex-1'>
                <section className={`${sidebarOpen ? 'md:ml-64': 'md:ml-0'} transition-all duration-300 p-6`}>
                    <div className="bg-white border border-(--borderColor)">
                        <section className="p-8 border-b border-(--borderColor)">

                        <span className="text-zinc-500 text-sm">ID: {id}</span>
                            <section className="flex justify-between">
                                <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-4">{produto.nome}</h1>  
                                <p>Status</p>
                            </section>
                            <section>
                                    <p className="text-4xl font-bold">{produto.quantidade} <span className="font-medium text-xl">em estoque</span></p>
                                </section>
                            </section>

                            <section className="p-10 font-sans flex flex-col gap-4">
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore officiis eveniet at animi odit quo sed veniam, voluptas molestiae voluptatem dolorum hic veritatis sit similique, iure consequatur accusantium numquam rem.
                                </p>
                                <section className="font-serif ">
                                    <div className="border-y flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>estoque mínimo</p>
                                        <p>1</p>
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>estoque máximo</p>
                                        <p>1</p>
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>valor unitário</p>
                                        <p>{produto.preco}</p>
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>valor em estoque</p>
                                        <p>1</p>
                                    </div>
                                </section>
                            </section>
                            <section className="border-t border-(--borderColor) p-8 ">
                                <Movement produtoAtual={produto} onUpdate={atualizarEstoquePai}/>
                            </section>

                            {user?.role === "admin"  && (<section className="border-t border-(--borderColor) flex items-center justify-center p-6">
                                <button className="p-2 border border-zinc-400 cursor-pointer rounded-md">editar</button>
                            </section>
                            )}

                    </div>
                </section>
            </main>
            <Footer/>
        </div>
        </>
    )
}

export default ProductDetail