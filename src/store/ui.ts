import { create } from "zustand";

type UIStore = {
  isMac: boolean;
  setMac: (isAMac: boolean) => void;
  isLoading: boolean;
  setLoading: (isItLoading: boolean) => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (isItOpen: boolean) => void;
  isAboutOpen: boolean;
  setAboutOpen: (isItOpen: boolean) => void;
};

const useUIState = create<UIStore>((set) => ({
  isMac: false,
  setMac: (isAMac: boolean) => set({ isMac: isAMac }),
  isLoading: false,
  setLoading: (isItLoading: boolean) => set({ isLoading: isItLoading }),
  isSettingsOpen: false,
  setSettingsOpen: (isItOpen: boolean) => set({ isSettingsOpen: isItOpen }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
}));

export default useUIState;
