import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import { useState, useEffect } from 'react';
import getPrevisao from '../services/getPrevisao.ts'

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

export interface Previsao{
    id: number,
    qtdPrevista: number,
    inicioPeriodo: string,
    fimPeriodo: string,
    criadoEm: string,
    produtoId: number
}

function Previsao() {
    const [sidebarOpen, setsidebarOpen] = useState(true);
    const [listaPrevisao, setListaPrevisao] = useState();
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

    
    return (
        <>
            <div className="flex flex-col min-h-screen">

                <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} />
                <main className='h-full flex-1 dark:bg-zinc-950'>
                    <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
                        ronaldo
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Previsao