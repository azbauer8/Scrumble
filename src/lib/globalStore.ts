import {create} from "zustand";

type Store = {
  markdown: string;
  setMarkdown: (markdown: string) => void;
};

const useGlobalStore = create<Store>((set) => ({
  markdown: "",
  setMarkdown: (markdown) => set({ markdown }),
}));

export default useGlobalStore;
