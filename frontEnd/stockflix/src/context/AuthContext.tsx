import { createContext, useState, useContext, type ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

interface User {
  id: number;
  login: string;
  acessoADM: Boolean;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, senha:string) => Promise<boolean>;
  logout: () => void;
  erroAuth: string | null;
  setErroAuth: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [erroAuth, setErroAuth] = useState<string | null>(null);
  const login = async (email: string, senha: string): Promise<boolean> => {
    const url = import.meta.env.VITE_API_URL;

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
  

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, erroAuth, setErroAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);