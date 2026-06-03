import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState, useEffect } from 'react';
import { type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext.tsx';
import Usuarios from '@/services/usuarios.ts';
import { criarUsuario } from '@/services/postUsuarios.ts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Trash2, Pen } from 'lucide-react'
import { atualizarUsuario } from '../services/putUsuario.ts'
import { deleteUsuario } from '@/services/deleteUsuario.ts';

export interface Usuario {
    id: number,
    login: string,
    senha: string,
    acessoADM: boolean
}


function UsuariosPage() {
    const { user } = useAuth();
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Usuario | undefined>(undefined);


    useEffect(() => {
        const carregarDadosDaApi = async () => {
            setLoading(true)
            try {
                const dados = await Usuarios();
                setListaUsuarios(dados);
            } catch (error) {
                console.error("Erro ao carregar os produtos na tela:", error);
            } finally {
                setLoading(false)
            }
        };

        carregarDadosDaApi();
    }, []);

    const handleStartEditing = (item: Usuario) => {
        if (user?.acessoADM === true) {
            setEditForm(item);
            setIsEditing(true);
        } else {
            toast.error("Acesso negado: Você não tem permissão para editar.");
        }
    };

    const handleSave = async () => {
        if (!editForm) return;

        try {
            // Faz a requisição PUT na API
            const usuarioAtualizado = await atualizarUsuario(editForm.id, editForm);

            // Atualiza o estado local corretamente mudando apenas o editado
            setListaUsuarios(prev =>
                prev.map(u => u.id === editForm.id ? usuarioAtualizado : u)
            );

            toast.success("Usuário atualizado com sucesso!", {
                description: `O login foi alterado para "${usuarioAtualizado.login}".`
            });

            setIsEditing(false);
            setEditForm(undefined);
        } catch (error) {
            console.error("Erro ao atualizar o usuário na API:", error);
            toast.error("Erro ao tentar salvar as alterações na API.");
        }
    };

    const handleDelete = async (id: number) => {
        const confirmar = window.confirm("Tem certeza que deseja deletar este usuário?");
        if (!confirmar) return;

        try {
            // Faz a requisição de delete na API
            await deleteUsuario.deletar(id);

            // Remove o usuário da lista local para sumir da tela imediatamente
            setListaUsuarios(prev => prev.filter(u => u.id !== id));

            toast.success(`Usuário foi deletado com sucesso!`);
        } catch (error) {
            console.error("Erro ao deletar:", error);
            toast.error("Erro ao tentar excluir o usuário.");
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const requestBody = {
            id: 0,
            login: login,
            senha: senha,
            acessoADM: false
        };

        try {
            await criarUsuario.criar(requestBody);
            toast.success("Usuario criado com sucesso!", {
                description: `O usuário "${login}" foi salvo no sistema.`,
            });

        } catch (error: any) {
            console.error('Erro na requisição POST:', error);
            const mensagem = "Houve um erro na hora de criar o usuário.";
            toast.error(mensagem);
        }
    };


    return (
        <>
            <div className="flex flex-col min-h-screen overflow-x-hidden">

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
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100 tracking-tight"> Usuarios </h1>
                        </div>
                        <div className='mt-4'>
                            {user?.acessoADM === true && (
                                <Dialog>
                                    {/* O DialogTrigger renderiza o seu botão sem quebrar o layout */}
                                    <DialogTrigger asChild>
                                        <button type="button" className="flex items-center w-50 md:w-auto gap-2 text-sm md:text-md bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
                                            <span className="text-sm lg:text-lg">+</span>
                                            Adicionar Usuário
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-106.25">
                                        <DialogHeader>
                                            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                                            <DialogDescription>
                                                Insira o login do usuário que deseja cadastrar no sistema.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4 pt-2" >
                                            <div className="flex flex-col gap-2">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        Login
                                                    </label>
                                                    <input id="name" value={login} onChange={(e) => setLogin(e.target.value)} className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
                                                    <label htmlFor="senha" className="text-sm font-medium text-gray-700 dark:text-zinc-200">
                                                        Senha
                                                    </label>
                                                    <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="col-span-3 min-w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:focus:ring-zinc-700" />
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
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">Login</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-zinc-200">AcessoADM </th>
                                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-zinc-200">Ações</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, rowIndex) => (
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
                                        listaUsuarios.map((item) => {
                                            // ESSA linha específica está em modo de edição?
                                            const estaEditandoEste = isEditing && editForm?.id === item.id;

                                            return (
                                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                                    {/* ID */}
                                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">{item.id}</td>

                                                    {/* CAMPO NOME */}
                                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">
                                                        {estaEditandoEste ? (
                                                            <input
                                                                type="text"
                                                                // O valor vem de dentro do objeto editForm que está sendo modificado
                                                                value={editForm.login}
                                                                onChange={(e) => setEditForm({ ...editForm, login: e.target.value })}
                                                                className="bg-white dark:bg-zinc-700 border border-violet-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-zinc-100"
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            item.login
                                                        )}
                                                    </td>

                                                    {/* ESTOQUE ID */}
                                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-zinc-200">{item.acessoADM ? ("true") : ("false")}</td>

                                                    {/* AÇÕES (BOTÕES) */}
                                                    <td className="px-4 py-3 text-right">
                                                        <div className='flex justify-end gap-4'>
                                                            {user?.acessoADM && (
                                                                estaEditandoEste ? (
                                                                    <>
                                                                        {/* Botão Salvar */}
                                                                        <button onClick={handleSave} title="Salvar alteração" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium cursor-pointer text-sm">
                                                                            Salvar
                                                                        </button>
                                                                        {/* Botão Cancelar */}
                                                                        <button onClick={() => { setIsEditing(false); setEditForm(undefined); }} title="Cancelar" className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300 font-medium cursor-pointer text-sm">
                                                                            Cancelar
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {/* Botão Editar - Passando o 'item' atual por parâmetro */}
                                                                        <button onClick={() => handleStartEditing(item)} title="Editar setor" className="text-violet-600 hover:text-violet-800 dark:text-violet-500 dark:hover:text-violet-400 font-medium cursor-pointer">
                                                                            <Pen size={17} />
                                                                        </button>

                                                                        {/* Botão Deletar */}
                                                                        <button onClick={() => handleDelete(item.id)} title="Deletar setor" className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium cursor-pointer">
                                                                            <Trash2 size={17} />
                                                                        </button>
                                                                    </>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
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

export default UsuariosPage