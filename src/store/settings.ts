import { create } from "zustand";

interface Settings {
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
}

type SettingsStore = {
  settings: Settings;
  setAutoSave: (autoSave: boolean) => void;
  setSaveBlur: (saveBlur: boolean) => void;
  setSaveInterval: (saveInterval: number) => void;
  setDefaultPath: (defaultPath: string) => void;
};

const useSettingsState = create<SettingsStore>((set) => ({
  settings: {
    autoSave: false,
    saveBlur: false,
    saveInterval: 60,
    defaultPath: "",
  },
  setAutoSave: (autoSave) =>
    set((state) => ({ settings: { ...state.settings, autoSave } })),
  setSaveBlur: (saveBlur) =>
    set((state) => ({ settings: { ...state.settings, saveBlur } })),
  setSaveInterval: (saveInterval) =>
    set((state) => ({ settings: { ...state.settings, saveInterval } })),
  setDefaultPath: (defaultPath) =>
    set((state) => ({ settings: { ...state.settings, defaultPath } })),
}));

export default useSettingsState;
