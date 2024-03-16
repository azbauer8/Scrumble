import { create } from "zustand"
import { persist } from "zustand/middleware"

export const openOnStartup = [
  "New File",
  "Previous File and Folder",
  "Custom Folder",
] as const

export type OpenOnStartup = (typeof openOnStartup)[number]

interface Settings {
  openOnStartup: OpenOnStartup
  previousFile: string
  previousFolder: string
  customStartupFolder: string
  autoSave: boolean
  saveBlur: boolean
  saveInterval: string | number
}

type SettingsStore = {
  settings: Settings
  setSettings: (settings: Settings) => void
  setOpenOnStartup: (openOnStartup: OpenOnStartup) => void
  setPreviousFile: (previousFile: string) => void
  setPreviousFolder: (previousFolder: string) => void
  setCustomStartupFolder: (customStartupFolder: string) => void
  setAutoSave: (autoSave: boolean) => void
  setSaveBlur: (saveBlur: boolean) => void
  setSaveInterval: (saveInterval: string | number) => void
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        openOnStartup: "New File",
        previousFile: "",
        previousFolder: "",
        customStartupFolder: "",
        autoSave: false,
        saveBlur: false,
        saveInterval: 60,
      },
      setSettings: (settings) => {
        set({ settings })
      },
      setOpenOnStartup: (openOnStartup) => {
        set((state) => ({ settings: { ...state.settings, openOnStartup } }))
      },
      setPreviousFile: (previousFile) => {
        set((state) => ({ settings: { ...state.settings, previousFile } }))
      },
      setPreviousFolder: (previousFolder) => {
        set((state) => ({ settings: { ...state.settings, previousFolder } }))
      },
      setCustomStartupFolder: (customStartupFolder) => {
        set((state) => ({
          settings: { ...state.settings, customStartupFolder },
        }))
      },
      setAutoSave: (autoSave) => {
        set((state) => ({ settings: { ...state.settings, autoSave } }))
      },
      setSaveBlur: (saveBlur) => {
        set((state) => ({ settings: { ...state.settings, saveBlur } }))
      },
      setSaveInterval: (saveInterval) => {
        set((state) => ({ settings: { ...state.settings, saveInterval } }))
      },
    }),
    {
      name: "wasd",
    },
  ),
)

export default useSettingsStore
