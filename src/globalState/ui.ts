import { atom } from "jotai";
export const isMacState = atom<boolean>(false);
export const isLoadingState = atom<boolean>(false);
export const settingsOpenState = atom<boolean>(false);
export const aboutOpenState = atom<boolean>(false);
export const toolbarOpenState = atom<boolean | "find" | "replace">(false);
export const editMenuOpenState = atom<boolean>(false);
export const isTwoColumnState = atom<boolean>(false);
