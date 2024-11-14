import { create } from "zustand"

const useNavStore = create((set) => ({
  expanded: null,
  setExpanded: (expanded) => set({ expanded }),
}))

export default useNavStore
