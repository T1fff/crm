/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "./supabaseCliente"
import useAuthStore from "./authStore"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const setAuthData = useAuthStore((sts) => sts.setAuthData)
  const authData = useAuthStore((sts) => sts.user)
  const clearAuthData = useAuthStore((sts) => sts.clearAuthData)
  const setLoading = useAuthStore((sts) => sts.setLoading)
  const loading = useAuthStore((sts) => sts.loading)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setAuthData(session, supabase.auth.signOut)
      setLoading(false)
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthData(session, supabase.auth.signOut)
    })

    return () => subscription.unsubscribe()
  }, [setAuthData, setLoading])

  useEffect(() => {
    if (!authData) return

    const expiresIn = 3600 * 1000 // 1 hora
    const timeout = setTimeout(() => {
      supabase.auth.signOut()
      clearAuthData()
      navigate("/")
    }, expiresIn)

    return () => clearTimeout(timeout)
  }, [authData, navigate, clearAuthData])

  const signOut = async () => {
    await supabase.auth.signOut()
    clearAuthData()
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthData, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext)
