import { create } from "zustand";

interface Settings {
  syntax: "GitHub" | "CommonMark";
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
}

type SettingsStore = {
  settings: Settings;
  setSyntax: (syntax: "GitHub" | "CommonMark") => void;
  setAutoSave: (autoSave: boolean) => void;
  setSaveBlur: (saveBlur: boolean) => void;
  setSaveInterval: (saveInterval: number) => void;
  setDefaultPath: (defaultPath: string) => void;
};

const useSettingsState = create<SettingsStore>((set) => ({
  settings: {
    syntax: "GitHub",
    autoSave: true,
    saveBlur: false,
    saveInterval: 60,
    defaultPath: "",
  },
  setSyntax: (syntax) =>
    set((state) => ({ settings: { ...state.settings, syntax } })),
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
