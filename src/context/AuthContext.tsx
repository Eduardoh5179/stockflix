import { createContext, useState, useContext, type ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

interface User {
  id: string;
  nome: string;
  role: UserRole;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, senha:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string, senha: string) => {
    const credenciais = {
      admin: { email: 'admin@teste.com', pass: 'admin123' },
      common: { email: 'user@teste.com', pass: 'user123' }
    };

    if (email === credenciais.admin.email && senha === credenciais.admin.pass) {
      setUser({ id: '1', nome: 'Administrador', role: 'admin' });
    } 
    else if (email === credenciais.common.email && senha === credenciais.common.pass) {
      setUser({ id: '2', nome: 'Usuário Comum', role: 'user' });
    } 
    else {
      alert("Usuário ou senha incorretos!");
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