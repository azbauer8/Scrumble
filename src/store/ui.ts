import { create } from "zustand";

type UIStore = {
  isLoading: boolean;
  setLoading: (isItLoading: boolean) => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (isItOpen: boolean) => void;
  isAboutOpen: boolean;
  setAboutOpen: (isItOpen: boolean) => void;
};

const useUIState = create<UIStore>((set) => ({
  isLoading: false,
  setLoading: (isItLoading: boolean) => set({ isLoading: isItLoading }),
  isSettingsOpen: false,
  setSettingsOpen: (isItOpen: boolean) => set({ isSettingsOpen: isItOpen }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
}));

export default useUIState;
