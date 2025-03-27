import { create } from "zustand"

const useAuthStore = create((set) => ({
  user: null,
  signOut: null,
  loading: true, // Nuevo estado de carga

  setAuthData: (user, signOut) => {
    set({ user, signOut, loading: false })
  },

  clearAuthData: () => {
    set({ user: null, signOut: null, loading: false })
  },

  setLoading: (loading) => set({ loading }),
}))

export default useAuthStore
