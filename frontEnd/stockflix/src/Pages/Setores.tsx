import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState, useEffect } from 'react';
import { type FormEvent } from 'react';
import getSetores from '@/services/getSetores.ts';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { criarSetor } from '@/services/postSetores.ts';
import { useAuth } from '@/context/AuthContext.tsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Setor {
    id: number;
    nome: string;
    estoqueId: number
}

function Setores() {
    const { user } = useAuth();
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [listaSetores, setListaSetores] = useState<Setor[]>([]);
    const [nome, setNome] = useState('');

    useEffect(() => {
        const carregarDadosDaApi = async () => {
            setLoading(true)
            try {
                const dados = await getSetores();
                setListaSetores(dados);
            } catch (error) {
                console.error("Erro ao carregar os produtos na tela:", error);
            } finally {
                setLoading(false)
            }
        };

        carregarDadosDaApi();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const requestBody = {
            id: 0,
            nome: nome,
            estoqueId: 0
        };

        try {
            await criarSetor.criar(requestBody);
            toast.success("Setor criado com sucesso!", {
                description: `O setor "${nome}" foi salvo no sistema.`,
            });

        } catch (error: any) {
            console.error('Erro na requisição POST:', error);
            const mensagem = "Houve um erro na hora de criar o setor.";
            toast.error(mensagem);
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">

                <Toaster
                    className='z-999'
                    position="top-center"
                    toastOptions={{
                        classNames: {
                            title: 'text-slate-950 font-semibold',
                            description: '!text-slate-500 font-normal',

                            success: 'bg-white border border-green-200 group success',
                            error: 'bg-white border border-red-200 group warning',

                            icon: 'group-[.success]:text-green-600 group-[.error]:text-red-500',
                        },
                    }} />
                <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} />
                <main className='h-full flex-1 dark:bg-zinc-950'>
                    <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
                        <div className="flex items-baseline gap-3">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100 tracking-tight"> Setores </h1>
                        </div>
                        <div className='mt-4'>
                            {user?.acessoADM === true && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button type="button" className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
                                            <span className="text-sm lg:text-lg">+</span>
                                            Adicionar setor
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-106.25">
                                        <DialogHeader>
                                            <DialogTitle>Adicionar Novo Setor</DialogTitle>
                                            <DialogDescription>
                                                Insira o nome do setor que deseja cadastrar no sistema.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4 pt-2" >

                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        Nome
                                                    </label>
                                                    <input id="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Logística, TI, RH..." className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
                                                </div>
                                            </div>

                                        <DialogFooter>
                                            <button type="submit" className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
                                                Criar
                                            </button>
                                        </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                        <section className='mt-4'>

                            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-zinc-900 text-sm">
                               
                                <thead className="bg-gray-50 dark:bg-zinc-800/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">ID</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Nome</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">EstoqueId</th>
                                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Ações</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, rowIndex) => (
                                            <tr key={`loading-row-${rowIndex}`} className="dark:bg-zinc-900">
                                                {Array.from({ length: 4 }).map((_, colIndex) => {
                                                    const randomWidth = `${Math.floor(Math.random() * 56) + 40}%`;

                                                    return (
                                                        <td key={`loading-cell-${rowIndex}-${colIndex}`} className="px-4 py-3 h-11">
                                                            <div
                                                                className="bg-zinc-200 dark:bg-zinc-800 h-4 rounded-md animate-pulse"
                                                                style={{ width: randomWidth }}
                                                            ></div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    ) : (
                                        listaSetores.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">{item.id}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">{item.nome}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">{item.estoqueId}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline cursor-pointer">
                                                        Editar
                                                    </button>
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

export default Setores