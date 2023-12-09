import { create } from "zustand";

type Store = {
  fileOpened: boolean;
  setFileOpened: (fileOpened: boolean) => void;
  markdown: string;
  setMarkdown: (markdown: string) => void;
  savePath: string;
  setSavePath: (savePath: string) => void;
};

const useGlobalStore = create<Store>((set) => ({
  fileOpened: false,
  setFileOpened: (fileOpened) => set({ fileOpened }),
  markdown: "",
  setMarkdown: (markdown) => set({ markdown }),
  savePath: "",
  setSavePath: (savePath) => set({ savePath }),
}));

export default useGlobalStore;
