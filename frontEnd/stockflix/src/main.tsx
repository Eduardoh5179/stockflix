import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css'
import './App.css'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './Pages/Login.tsx'
import Home from './Pages/Home.tsx'
import Error from './Pages/Error.tsx'
import ErrorService from './Pages/ErrorService.tsx'
import Create from './Pages/Create.tsx'
import History from './Pages/History.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import ProductDetail from './Pages/ProductDetail.tsx'
import Setores from './Pages/Setores.tsx'
import Usuarios from './Pages/Usuarios.tsx'
import Previsao from './Pages/PrevisaoTeste.tsx'
import Loading from './components/Loading.tsx'
import Estoques from './Pages/Estoques.tsx'

interface RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: RouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Loading />
    )
  }
  return user ? <>{children}</> : <Navigate to="/Login" replace />;
};

const PublicRoute = ({ children }: RouteProps) => {
  const { user } = useAuth();

  return !user ? <>{children}</> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/Login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/Create",
    element: (
      <PrivateRoute>
        <Create />
      </PrivateRoute>
    )
  },
  {
    path: "/History",
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    )
  },
  {
    path: "/Products",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    )
  },
  {
    path: "/Products/:id",
    element: (
      <PrivateRoute>
        <ProductDetail />
      </PrivateRoute>
    )
  },
  {
    path: "/Sectors",
    element: (
      <PrivateRoute>
        <Setores />
      </PrivateRoute>
    )
  },
  {
    path: "/Users",
    element: (
      <PrivateRoute>
        <Usuarios />
      </PrivateRoute>
    )
  },
  {
    path: "/",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    errorElement: <Error />
  },
  {
    path: "/ErrorService",
    element: (<PublicRoute>
      <ErrorService />
    </PublicRoute>
    ),
  },
  {
    path: "/Previsao",
    element: (
      <PrivateRoute>
        <Previsao />
      </PrivateRoute>
    )
  },
  {
    path: "/Estoques",
    element: (
      <PrivateRoute>
        <Estoques />
      </PrivateRoute>
    )
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
