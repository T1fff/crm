import { create } from "zustand"

const useAuthStore = create((set) => ({
  user: null,
  signOut: null,
  isAuthenticated: !!localStorage.getItem("user"),
  setAuthData: (user, signOut) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user, signOut, isAuthenticated: true })
  },
  clearAuthData: () => {
    localStorage.removeItem("user")
    set({ user: null, signOut: null, isAuthenticated: false })
  },
}))

export default useAuthStore
