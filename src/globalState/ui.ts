import { atom } from "jotai";
export const isLoading = atom<boolean>(false);
export const settingsOpen = atom<boolean>(false);
export const aboutOpen = atom<boolean>(false);
export const toolbarOpen = atom<boolean | "find" | "replace">(false);
export const editMenuOpen = atom<boolean>(false);

const defaultVibrancyConfig = {
  acrylic: false,
  mica: false,
  vibrancy: false,
};

interface VibrancyConfig {
  acrylic: boolean;
  mica: boolean;
  vibrancy: boolean;
}

export const vibrancyConfig = atom<VibrancyConfig>(defaultVibrancyConfig);
export const isTwoColumn = atom<boolean>(false);
