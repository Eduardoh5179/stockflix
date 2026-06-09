import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState, useEffect } from 'react';
import { type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext.tsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import getPrevisao from '../services/getPrevisao.ts';
import { criarPrevisao } from '../services/postPrevisao.ts'
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"

// [
//   {
//     "id": 0,
//     "qtdPrevista": 0,
//     "inicioPeriodo": "string",
//     "fimPeriodo": "string",
//     "criadoEm": "string",
//     "produtoId": 0
//   }
// ]

export interface Previsao {
    id: number,
    qtdPrevista: number,
    inicioPeriodo: string,
    fimPeriodo: string,
    criadoEm: string,
    produtoId: number
}

function Previsao() {
    const { user } = useAuth();
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const [listaPrevisao, setListaPrevisao] = useState<Previsao[]>([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [id, setId] = useState<number | ''>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const carregarDadosDaApi = async () => {
            setLoading(true)
            try {
                const dados = await getPrevisao();

                setListaPrevisao(dados);

            } catch (error) {
                console.error("Erro ao carregar os produtos na tela:", error);
            } finally {
                setLoading(false)
            }
        };

        carregarDadosDaApi();
    }, []);

    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();

    //     const requestBody = {
    //         id: 0,
    //         nome: nome,
    //         preco: Number(preco),
    //         quantidade: 0,
    //         descricao: descricao,
    //         setorId: Number(setorId)
    //     };

    //     try {
    //         await produtoService.criar(requestBody);
    //         toast.success("Produto criado com sucesso!", {
    //             description: `O produto "${nome}" foi salvo no sistema.`,
    //         });
    //         setNome('');
    //         setDescricao('');
    //         setSetorId('1');
    //         setPreco('');

    //     } catch (error: any) {
    //         console.error('Erro na requisição POST:', error);
    //         const mensagem = "Houve um erro ao tentar criar o produto.";

    //         setErrorStatus(mensagem);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id === '' || !dataInicio || !dataFim) {
            toast.error("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const dadosParaEnviar = {
                id: 0, 
                produtoId: Number(id), 
                inicioPeriodo: dataInicio, 
                fimPeriodo: dataFim,       
                qtdPrevista: 0, 
                criadoEm: "", 
                produtoNome: "", 
            };

  
            await criarPrevisao.criar(dadosParaEnviar);

            toast.success("Previsão gerada com sucesso!");


            setDataInicio('');
            setDataFim('');
            setId(0);

        } catch (error: any) {
            console.error("Erro ao gerar previsão:", error);
            toast.error(error.message || "Erro ao tentar salvar a previsão na API.");
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
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100 tracking-tight"> Previsões </h1>
                        </div>

                        <div className="mt-4">

                            {user?.acessoADM === true && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button type="button" className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
                                            <span className="text-sm lg:text-lg">+</span>
                                            criar previsão
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-106.25">
                                        <DialogHeader>
                                            <DialogTitle>Gerar nova previsão</DialogTitle>
                                            <DialogDescription>
                                                Insira o id do produto e datas de inicio e fim para gerar uma previsão
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form className="space-y-4 pt-2" onSubmit={handleSubmit} >
                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="inicio" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        inicio do periodo
                                                    </label>
                                                    <input id="inicio" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} type='date' className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
                                                    <label htmlFor="fim" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        fim do periodo
                                                    </label>
                                                    <input id="fim" value={dataFim} onChange={(e) => setDataFim(e.target.value)} type='date' className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
                                                    <label htmlFor="id" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        id do produto
                                                    </label>
                                                    <input id="id" type='number' value={id} onChange={(e) => setId(e.target.value === '' ? '' : Number(e.target.value))} className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <button type="submit" className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
                                                    Gerar
                                                </button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>

                        <section className='mt-6 overflow-x-auto'>
                            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                                <thead className="bg-gray-50 dark:bg-zinc-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200 border-l-none">idProduto</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">qtdPrevista</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">dataInicio</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">dataFim</th>
                                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">criadoEm</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 duration-300">
                                    {loading ? (
                                        Array.from({ length: 6 }).map((_, rowIndex) => (
                                            <tr key={`loading-row-${rowIndex}`} className="hover:bg-gray-50 transition-colors dark:bg-zinc-900 dark:hover:bg-zinc-800/50 ">
                                                {Array.from({ length: 5 }).map((_, colIndex) => {
                                                    const randomWidth = `${Math.floor(Math.random() * 56) + 40}%`;

                                                    return (
                                                        <td key={`loading-cell-${rowIndex}-${colIndex}`} className="px-4 py-3 h-10">
                                                            <div
                                                                className="bg-zinc-200 h-full dark:bg-zinc-700 rounded-md animate-pulse"
                                                                style={{ width: randomWidth }}
                                                            ></div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    ) : (
                                        listaPrevisao.toReversed().map((item) => (
                                            <tr key={item.id} className='dark:hover:bg-zinc-800/30'>
                                                <td className="px-4 py-3 text-gray-700 font-medium dark:bg-zinc-900 dark:text-zinc-300">
                                                    {item.id}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 font-medium dark:bg-zinc-900 dark:text-zinc-300">
                                                    {item.qtdPrevista}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                                                    {new Date(item.inicioPeriodo).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                </td>

                                                <td className="px-4 py-3 text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                                                    {new Date(item.fimPeriodo).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                </td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:bg-zinc-900 dark:text-zinc-300">
                                                    {new Date(item.criadoEm).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
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

export default Previsao