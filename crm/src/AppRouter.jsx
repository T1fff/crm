import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes/Clientes"
import ClienteDetail from "./pages/Clientes/ClienteDetail"
import useAuthStore from "./authStore"

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes/:clientId"
        element={
          <PrivateRoute>
            <ClienteDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/crear_cliente"
        element={
          <PrivateRoute>
            <ClienteDetail />
          </PrivateRoute>
        }
      />

      {/* Otras rutas se pueden agregar aquí */}
    </Routes>
  )
}

export default AppRoutes
