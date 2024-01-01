import { ImperativePanelHandle } from "react-resizable-panels";
import { create } from "zustand";

type UIStore = {
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (isItOpen: boolean) => void;
  sidebarRef: ImperativePanelHandle | null;
  setSidebarRef: (sidebar: ImperativePanelHandle | null) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isItOpen: boolean) => void;
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
  sidebarRef: null,
  setSidebarRef: (sidebar: ImperativePanelHandle | null) =>
    set({ sidebarRef: sidebar }),
  isSidebarOpen: false,
  setSidebarOpen: (isItOpen: boolean) => set({ isSidebarOpen: isItOpen }),
  isSettingsOpen: false,
  setSettingsOpen: (isItOpen: boolean) => set({ isSettingsOpen: isItOpen }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
  isLinkSelected: { isSelected: false, link: null },
  setLinkSelected: (isItSelected: boolean, link: string | null) =>
    set({ isLinkSelected: { isSelected: isItSelected, link: link } }),
}));

export default useUIState;
