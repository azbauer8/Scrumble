import { create } from "zustand";

type UIStore = {
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (isItOpen: boolean) => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (isItOpen: boolean) => void;
  isAboutOpen: boolean;
  setAboutOpen: (isItOpen: boolean) => void;
  isLinkSelected: { isSelected: boolean; link: string | null };
  setLinkSelected: (isItSelected: boolean, link: string | null) => void;
};

const useUIState = create<UIStore>((set) => ({
  isCommandMenuOpen: false,
  setCommandMenuOpen: (isItOpen: boolean) =>
    set({ isCommandMenuOpen: isItOpen }),
  isSettingsOpen: false,
  setSettingsOpen: (isItOpen: boolean) => set({ isSettingsOpen: isItOpen }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
  isLinkSelected: { isSelected: false, link: null },
  setLinkSelected: (isItSelected: boolean, link: string | null) =>
    set({ isLinkSelected: { isSelected: isItSelected, link: link } }),
}));

export default useUIState;
