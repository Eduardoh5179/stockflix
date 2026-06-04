import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';


export type UserRole = 'admin' | 'user';

interface User {
  id: number;
  login: string;
  acessoADM: boolean;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  erroAuth: string | null;
  setErroAuth: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [erroAuth, setErroAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const usuarioLocal = localStorage.getItem('@App:user');

        if (!usuarioLocal) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${url}/auth/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const dadosUsuario = await response.json();
          setUser(dadosUsuario);
          localStorage.setItem('@App:user', JSON.stringify(dadosUsuario));
        } else {
          localStorage.removeItem('@App:user');
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao restaurar sessão:", error);
        localStorage.removeItem('@App:user');
      } finally {
        setLoading(false); 
      }
    };

    verificarSessao();
  }, [url]);


  const login = async (email: string, senha: string): Promise<boolean> => {

    try {
      setErroAuth(null);
      const credenciais = {
        "login": email,
        "senha": senha
      }


      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credenciais)
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas ou erro no servidor');
      }

      const dadosUsuario = await response.json();
      localStorage.setItem('@App:user', JSON.stringify(dadosUsuario));
      setUser(dadosUsuario);
      console.log("Resposta do servidor:", dadosUsuario);

      return true;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setErroAuth("Usuário/senha incorretos ou houve um erro interno no servidor");
      return false;
    }
  };


  const logout = () => {
    localStorage.removeItem('@App:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, erroAuth, setErroAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);