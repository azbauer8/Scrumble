import { create } from "zustand";
import { UpdateJson } from "../utils/settingsOps";

interface Settings {
  spellCheck: string;
  openOnStartup: string;
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
}

type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  setSpellCheck: (spellCheck: string) => void;
  setOpenOnStartup: (openOnStartup: string) => void;
  setAutoSave: (autoSave: boolean) => void;
  setSaveBlur: (saveBlur: boolean) => void;
  setSaveInterval: (saveInterval: number) => void;
};

const useSettingsState = create<SettingsStore>((set) => ({
  settings: {
    spellCheck: "false",
    openOnStartup: "New File",
    autoSave: false,
    saveBlur: false,
    saveInterval: 60,
  },
  setSettings: (settings) => {
    set({ settings });
  },
  setSpellCheck: (spellCheck) => {
    set((state) => ({ settings: { ...state.settings, spellCheck } }));
    UpdateJson();
  },
  setOpenOnStartup: (openOnStartup) => {
    set((state) => ({ settings: { ...state.settings, openOnStartup } }));
    UpdateJson();
  },
  setAutoSave: (autoSave) => {
    set((state) => ({ settings: { ...state.settings, autoSave } }));
    UpdateJson();
  },
  setSaveBlur: (saveBlur) => {
    set((state) => ({ settings: { ...state.settings, saveBlur } }));
    UpdateJson();
  },
  setSaveInterval: (saveInterval) => {
    set((state) => ({ settings: { ...state.settings, saveInterval } }));
    UpdateJson();
  },
}));

export default useSettingsState;
