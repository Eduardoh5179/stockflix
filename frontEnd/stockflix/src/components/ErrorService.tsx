import { CircleX } from 'lucide-react';

function ErrorService() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[65vh] px-6 text-center bg-white border border-(--borderColor) rounded-xl p-12 shadow-sm max-w-2xl mx-auto my-8 dark:bg-zinc-900 dark:border-zinc-800">

                <div className="flex items-center justify-center w-20 h-20 mb-6 bg-violet-50 text-red-400 rounded-full dark:bg-red-500/10 dark:text-red-400">
                    <CircleX size={45} />
                </div>

                <span className="text-5xl font-black text-zinc-800 tracking-tight mb-2 dark:text-zinc-100">500</span>
                <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight dark:text-zinc-200">
                    Houve um erro ao carregar os dados
                </h1>
                <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed dark:text-zinc-400">
                    Ocorreu um erro inesperado ao nos comunicarmos com o servidor. Por favor, tente atualizar a página ou reiniciar sua internet.
                </p>
            </div>
        </>
    )
}

export default ErrorService