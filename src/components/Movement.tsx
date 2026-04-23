import { useState } from "react"
import { type Produto } from "../data/constants.ts"

interface MovementProps {
    produtoAtual: Produto;
    onUpdate: (novaQuantidade: number) => void;
}

function Movement({produtoAtual, onUpdate }: MovementProps){
    const [quantidade,setQuantidade] = useState(1);

    const [tipo,setTipo] = useState <'entrada' | 'saida'>("entrada")

    const aumentar = () => setQuantidade(prev=>prev+1);
    const diminuir = () =>{
        if (quantidade>1) setQuantidade(prev => prev-1);
    }

    const registrarMovimentacao = () => {
        if (quantidade <= 0) return alert("Insira uma quantidade válida");

        const novoEstoque = tipo === 'entrada' 
            ? produtoAtual.quantidade + quantidade 
            : produtoAtual.quantidade - quantidade;

        if (novoEstoque < 0) return alert("Estoque insuficiente!");

        onUpdate(novoEstoque);
        alert(`A operação foi concluída com sucesso!`);
    };

    return(
            <>
            <h2 className="text-zinc-700 font-medium text-lg mb-6">Movimentação</h2>
            <section className="flex flex-col gap-4">
                <section className="flex gap-4">
                        <button onClick={()=> setTipo('entrada')} className={`px-6 py-1.5 text-sm font-medium rounded-md text-white cursor-pointer bg-green-600 hover:bg-green-700 hover:text-white ${tipo === 'entrada' ? 'bg-green-600 text-white ring-2 ring-offset-1 ring-green-600' : 'bg-zinc-100 text-zinc-600'}`}>
                            + entrada
                        </button>
                        <button onClick={()=> setTipo('saida')} className={`px-6 py-1.5 text-sm font-medium rounded-md text-white cursor-pointer bg-red-600 hover:bg-red-700 hover:text-white ${tipo === 'saida' ? 'bg-red-600 text-white ring-2 ring-offset-1 ring-red-600' : 'bg-zinc-100 text-zinc-600'}`}>
                            - retirada
                        </button>
                    </section>
    
                    <section className="flex gap-1">
                        <button onClick={diminuir} className="w-9 h-9 border border-zinc-300 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer">−</button>
                        <input type="number" min={1} value={quantidade} onChange={(e)=>{
                            const valor = parseInt(e.target.value);
                            if (!isNaN(valor) && valor >= 1) {
                                setQuantidade(valor);
                            } else if (e.target.value === "") {
                                setQuantidade(0); 
                            }
                        }} placeholder="Qtd." className="w-24 h-9 border border-zinc-300 rounded-md px-3 text-sm text-center text-slate-800 focus:outline-none focus:border-zinc-500"/>
                        <button onClick={aumentar} className="w-9 h-9 border border-zinc-300 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer">+</button>
                    </section>
    
                    <section>
                        <p className="text-sm text-zinc-700 font-semibold">Motivo</p>
                        <select className="w-full md:w-80 h-9 border mt-2 border-zinc-300 rounded-md px-3 text-sm text-slate-700 bg-white focus:outline-none focus:border-zinc-500">
                            <option value="">Compra de fornecedor</option>
                            <option value="">Devolução de cliente</option>
                            <option value="">Transferência interna</option>
                            <option value="">Ajuste de inventário</option>
                        </select>
                    </section>
                    <section>
                        <button onClick={registrarMovimentacao} className="w-fit px-6 py-2 rounded-md text-sm text-white cursor-pointer bg-zinc-900">
                            Confirmar {tipo === 'entrada' ? 'Entrada' : 'Retirada'}
                        </button>
                    </section>
                    </section>
                </>
    )
}

    {/* <h2 className="text-zinc-700 font-medium text-lg mb-6">Movimentação</h2>
            <div className="flex rounded-md border border-zinc-200 overflow-hidden w-fit">
                <div className="flex items-col gap-6">
                    <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Tipo de Operação</span>
                    <div className="flex rounded-lg border border-zinc-200 overflow-hidden w-fit bg-white p-1 ">
                        <button className="px-6 py-1.5 text-sm font-medium rounded-md bg-zinc-900 text-white cursor-pointer">
                            entrada
                        </button>
                        <button className="px-6 py-1.5 text-sm font-medium rounded-md bg-zinc-900 text-white cursor-pointer">
                            saída
                        </button>
                    </div>
                    <button className="w-9 h-9 border border-zinc-300 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer">−</button>
                    <input type="number" min={1} placeholder="Qtd." className="w-24 h-9 border border-zinc-300 rounded-md px-3 text-sm text-center text-slate-800 focus:outline-none focus:border-zinc-500"/>
                    <button className="w-9 h-9 border border-zinc-300 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer">+</button>
                    <span className="text-xs text-zinc-400 ml-1">un</span>
                    </div>
                    <select className="w-full md:w-80 h-9 border border-zinc-300 rounded-md px-3 text-sm text-slate-700 bg-white focus:outline-none focus:border-zinc-500">
                        <option value="">Selecione o motivo</option>
                    </select>
                    {<p className="text-xs text-red-600"></p>}
                    <button className="w-fit px-6 py-2 rounded-md text-sm text-white transition-colors cursor-pointer bg-red-600 hover:bg-red-700">
                        Registrar 
                    </button>
        </div> */}

export default Movement