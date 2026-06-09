import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email,senha);
    navigate('/');
  };
  return (
    
    <>
       <section className="w-screen h-screen flex">
  
            <section className="h-screen w-full p-4 flex justify-center items-center">
  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl border border-slate-400">
    

    <div className="text-center flex items-center justify-center flex-col transition space-y-2">
      <img src= {Logo} alt="logo" className='w-32'/>
      <h2 className="text-3xl font-bold text-slate-900">Acesse o Sistema</h2>
      <p className="text-slate-500 text-sm">Entre com suas credenciais de estoque</p>
    </div>

    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700 ml-1">Usuário</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="ex: eduardo.estoque" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"/>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700 ml-1">Senha</label>
        <input type="password" placeholder="••••••••" onChange={(e) => setSenha(e.target.value)}  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
      </div>

      <button type="submit" className="w-full py-3 px-4 bg-violet-700 hover:bg-violet-900 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all cursor-pointer">
        Entrar no Painel
      </button>
    </form>

    <p className="text-center text-xs text-slate-400">
      Problemas com acesso? <span className="text-blue-500 cursor-pointer hover:underline">Suporte TI</span>
    </p>
  </div>
</section>
       </section>
    </>
  )
}

export default Login