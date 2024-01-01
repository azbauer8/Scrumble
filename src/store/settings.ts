import { create } from "zustand";
import { updateJson } from "@/utils/settingsOps";
import useFileState from "./file";

interface Settings {
  spellCheck: string;
  openOnStartup: string;
  customStartupFolder: string;
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
}

type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  setSpellCheck: (spellCheck: string) => void;
  setOpenOnStartup: (openOnStartup: string) => void;
  setCustomStartupFolder: (customStartupFolder: string) => void;
  setAutoSave: (autoSave: boolean) => void;
  setSaveBlur: (saveBlur: boolean) => void;
  setSaveInterval: (saveInterval: number) => void;
};

const useSettingsState = create<SettingsStore>((set) => ({
  settings: {
    spellCheck: "false",
    openOnStartup: "New File",
    customStartupFolder: "",
    autoSave: false,
    saveBlur: false,
    saveInterval: 60,
  },
  setSettings: (settings) => {
    set({ settings });
  },
  setSpellCheck: (spellCheck) => {
    set((state) => ({ settings: { ...state.settings, spellCheck } }));
    updateJson();
  },
  setOpenOnStartup: (openOnStartup) => {
    set((state) => ({ settings: { ...state.settings, openOnStartup } }));
    if (openOnStartup === "Previous File and Folder") {
      useFileState.getState().setOpenFolder(useFileState.getState().filePath);
    }
    updateJson();
  },
  setCustomStartupFolder: (customStartupFolder) => {
    set((state) => ({ settings: { ...state.settings, customStartupFolder } }));
    updateJson();
  },
  setAutoSave: (autoSave) => {
    set((state) => ({ settings: { ...state.settings, autoSave } }));
    updateJson();
  },
  setSaveBlur: (saveBlur) => {
    set((state) => ({ settings: { ...state.settings, saveBlur } }));
    updateJson();
  },
  setSaveInterval: (saveInterval) => {
    set((state) => ({ settings: { ...state.settings, saveInterval } }));
    updateJson();
  },
}));

export default useSettingsState;
