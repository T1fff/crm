import { create } from "zustand"

const useClientsStore = create((set) => ({
  petitionState: null,
  setPetitionState: (petitionState) => set({ petitionState }),
}))

export default useClientsStore
