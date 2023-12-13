import { atom } from "jotai";
export const isMac = atom<boolean>(false);
export const isLoading = atom<boolean>(false);
export const settingsOpen = atom<boolean>(false);
export const aboutOpen = atom<boolean>(false);
export const toolbarOpen = atom<boolean | "find" | "replace">(false);
export const editMenuOpen = atom<boolean>(false);
export const isTwoColumn = atom<boolean>(false);
