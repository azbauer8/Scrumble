import { create } from "zustand"

interface UIState {
  commandOpen: boolean
  setCommandOpen: (commandOpen: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
}

const useUIStore = create<UIState>()((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set(() => ({ commandOpen })),
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
}))

export default useUIStore
