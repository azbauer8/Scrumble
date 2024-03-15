import { create } from "zustand"

interface UIState {
  commandOpen: boolean
  setCommandOpen: (commandOpen: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  isMac: boolean
  setMac: (isAMac: boolean) => void
}

const useUIStore = create<UIState>()((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set(() => ({ commandOpen })),
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
  isMac: false,
  setMac: (isAMac: boolean) => set({ isMac: isAMac }),
}))

export default useUIStore
