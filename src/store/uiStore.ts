import { create } from "zustand"

interface UIState {
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  sidebarWidth: number
  setSidebarWidth: (sidebarWidth: number) => void
  settingsOpen: boolean
  setSettingsOpen: (settingsOpen: boolean) => void
  isMac: boolean
  setMac: (isAMac: boolean) => void
}

const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
  sidebarWidth: 15,
  setSidebarWidth: (sidebarWidth) => set(() => ({ sidebarWidth })),
  settingsOpen: false,
  setSettingsOpen: (settingsOpen) => set(() => ({ settingsOpen })),
  isMac: false,
  setMac: (isAMac: boolean) => set({ isMac: isAMac }),
}))

export default useUIStore
