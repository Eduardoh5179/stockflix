import { useParams } from "react-router-dom"
import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import Movement from '../components/Movement.tsx'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { type Produto } from '../data/constants.ts'
import produtosPorID from '../services/produtosID.ts'
import atualizarProduto from '../services/produtoPut.ts'
import { Spinner } from "@/components/ui/spinner"
import { Pen } from 'lucide-react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const { user } = useAuth();

    const [produto, setProduto] = useState<Produto | undefined>();
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Produto | undefined>(undefined);


    const handleStartEditing = () => {
        if (user?.acessoADM === true) {
            setEditForm(produto);
            setIsEditing(true);
        } else {
            toast.error("Acesso negado: Você não tem permissão para editar.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (editForm) {
            setEditForm({
                ...editForm,
                [name]: (name === "preco" || name === "setorId") ? Number(value) : value
            });
        }
    };
    useEffect(() => {
        const carregarProduto = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const dados = await produtosPorID(Number(id));

                setProduto(dados || undefined);
            } catch (error) {
                console.error("Erro ao carregar detalhes do produto:", error);
                setProduto(undefined);
            } finally {
                setLoading(false);
            }
        };

        carregarProduto();
    }, [id]);

    console.log(produto)


    if (loading) {
        {
            return (
                <>
                    <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
                    <Sidebar isOpen={sidebarOpen} />

                    <main className='h-full flex-1'>
                        <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>
                            <div className="bg-white border border-(--borderColor)">

                                <>
                                    <section className="p-8 border-b border-(--borderColor) flex flex-col gap-4 animate-pulse">
                                        <div className="bg-zinc-200 h-4 w-16 rounded-md"></div>

                                        <div className="flex justify-between items-center">
                                            <div className="bg-zinc-200 h-8 w-1/2 md:w-1/3 rounded-md"></div>
                                            <div className="bg-zinc-200 h-5 w-14 rounded-md"></div>
                                        </div>

                                        <div className="bg-zinc-200 h-10 w-48 rounded-md mt-2"></div>
                                    </section>

                                    <section className="p-10 flex flex-col gap-6 animate-pulse">
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-zinc-200 h-4 w-full rounded-md"></div>
                                            <div className="bg-zinc-200 h-4 w-5/6 rounded-md"></div>
                                        </div>

                                        <div className="border-t border-(--borderColor) pt-2 flex flex-col gap-4">
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <div key={`skeleton-row-${index}`} className="flex justify-between py-2 px-4 border-b border-(--borderColor)/50">
                                                    <div className="bg-zinc-200 h-4 w-28 rounded-md"></div>
                                                    <div className="bg-zinc-200 h-4 w-16 rounded-md"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="border-t border-(--borderColor) p-8 animate-pulse">
                                        <div className="bg-zinc-200 h-12 w-full rounded-md"></div>
                                    </section>
                                </>
                            </div>
                        </section>
                    </main>

                </>
            );
        }

    }

    if (!produto) {
        return (
            <>
                <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} />
                <main className='h-full flex-1'>
                    <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
                        <h2> ERRO </h2>
                    </section>
                </main>
            </>
        );
    }
    const valorEmEstoque = produto.preco * produto.quantidade

    const atualizarEstoquePai = (novaQuantidade: number) => {
        if (produto) {
            setProduto({ ...produto, quantidade: novaQuantidade });
        }
    };


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} />

                <Toaster
                    position="top-center"
                    toastOptions={{
                        classNames: {
                            title: 'text-slate-950 font-semibold',
                            description: '!text-slate-500 font-normal',

                            success: 'bg-white border border-green-200 group success',
                            error: 'bg-white border border-red-200 group warning',

                            icon: 'group-[.success]:text-green-600 group-[.error]:text-red-500',
                        },
                    }}
                />
                <main className='h-full flex-1'>
                    <section className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} transition-all duration-300 p-6`}>
                        <div className="bg-white border border-(--borderColor)">
                            <section className="p-8 border-b border-(--borderColor)">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-zinc-500 text-sm">ID: {id}</span>

                                    {user?.acessoADM && !isEditing && (
                                        <button onClick={handleStartEditing} className="p-2 text-zinc-800  hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all cursor-pointer border border-transparent hover:border-violet-200" title="Editar Informações">
                                            <Pen size={18} />
                                        </button>
                                    )}
                                </div>

                                <section className="flex justify-between">
                                    {isEditing && user?.acessoADM ? (
                                        <input name="nome" className="text-xl md:text-3xl font-bold text-slate-800 mb-4 border-b-2 border-violet-500 outline-none bg-slate-50 px-2 w-full" value={editForm?.nome} onChange={handleChange} />
                                    ) : (
                                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-4">{produto.nome}</h1>
                                    )}
                                    <p>Status</p>
                                </section>
                                <section>
                                    <p className="text-4xl font-bold">{produto.quantidade} <span className="font-medium text-xl">em estoque</span></p>
                                </section>
                            </section>

                            <section className="p-10 font-sans flex flex-col gap-4">
                                {isEditing && user?.acessoADM ? (
                                    <textarea name="descricao" className="w-full p-3 border border-violet-300 rounded-md text-sm bg-slate-50 outline-none" rows={3} value={editForm?.descricao} onChange={handleChange} />) : (
                                    <p className="text-sm">{produto.descricao}</p>
                                )}
                                <section className="font-serif ">
                                    <div className="border-y flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>estoque previsto</p>
                                        <p>1</p>
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>Setor</p>
                                        {isEditing && user?.acessoADM ? (<select name="setorId" value={editForm?.setorId} onChange={handleChange} className="border border-violet-300 rounded px-2 py-1 text-sm outline-none">
                                            <option value={1}>Setor 1</option>
                                            <option value={2}>Setor 2</option>
                                            <option value={3}>Setor 3</option>
                                        </select>) : (
                                            <p>{produto.setorId}</p>)}
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>valor unitário</p>
                                        {isEditing && user?.acessoADM ? (
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-slate-50">R$</span>
                                                <input name="preco" type="number" step="0.01" className="border border-violet-300 rounded px-2 py-1 text-sm w-24 outline-none" value={editForm?.preco} onChange={handleChange} />
                                            </div>) : (<p>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>)}
                                    </div>
                                    <div className="border-b flex font-medium justify-between border-(--borderColor) py-2 px-4">
                                        <p>valor em estoque</p>
                                        <p>{valorEmEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    </div>
                                </section>
                            </section>
                            <section className="border-t border-(--borderColor) p-8 ">
                                <Movement produtoAtual={produto} onUpdate={atualizarEstoquePai} />
                            </section>
                            {user?.acessoADM === true && isEditing && (
                                <section className="border-t border-(--borderColor) flex items-center justify-center p-6 bg-slate-50/50 transition-all animate-fade-in">
                                    <div className="flex items-center gap-3 w-full max-w-md justify-center">
                                        <button onClick={() => setIsEditing(false)} disabled={isUpdating} className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 active:bg-slate-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (!editForm) return;
                                                setIsUpdating(true);
                                                try {
                                                    const resultado = await atualizarProduto(Number(id), editForm);
                                                    toast.success("Dados editados com sucesso!")
                                                    setProduto(resultado);
                                                    setIsEditing(false);
                                                } catch (error) {
                                                    toast.error("Houve um erro ao salvar as alterações.");
                                                } finally {
                                                    setIsUpdating(false);
                                                }
                                            }}
                                            disabled={isUpdating}
                                            className="flex-1 px-4 py-2.5 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 active:bg-violet-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-violet-100">
                                            {isUpdating ? (
                                                <>
                                                    <Spinner />
                                                    <span>Salvando...</span>
                                                </>
                                            ) : (
                                                <span>Salvar Alterações</span>
                                            )}
                                        </button>
                                    </div>
                                </section>
                            )}
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default ProductDetail