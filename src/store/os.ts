import { create } from "zustand";

type OSStore = {
  isMac: boolean;
  setMac: (isAMac: boolean) => void;
  appVersion: string;
  setAppVersion: (appVersion: string) => void;
  tauriVersion: string;
  setTauriVersion: (tauriVersion: string) => void;
};

const useOSState = create<OSStore>((set) => ({
  isMac: false,
  setMac: (isAMac: boolean) => set({ isMac: isAMac }),
  appVersion: "",
  setAppVersion: (appVersion: string) => set({ appVersion }),
  tauriVersion: "",
  setTauriVersion: (tauriVersion: string) => set({ tauriVersion }),
}));

export default useOSState;
