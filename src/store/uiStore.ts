import { create } from "zustand"

interface UIState {
  commandOpen: boolean
  setCommandOpen: (commandOpen: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  sidebarWidth: number
  setSidebarWidth: (sidebarWidth: number) => void
  isMac: boolean
  setMac: (isAMac: boolean) => void
}

const useUIStore = create<UIState>()((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set(() => ({ commandOpen })),
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
  sidebarWidth: 15,
  setSidebarWidth: (sidebarWidth) => set(() => ({ sidebarWidth })),
  isMac: false,
  setMac: (isAMac: boolean) => set({ isMac: isAMac }),
}))

export default useUIStore
