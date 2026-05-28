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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, senha: string): Promise<boolean> => {
    const url = import.meta.env.VITE_API_URL;

    try {
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
      setUser(dadosUsuario);
      console.log("Resposta do servidor:", dadosUsuario);

      return true;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Usuário ou senha incorretos!");
      return false; 
    } 
  };
  

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);