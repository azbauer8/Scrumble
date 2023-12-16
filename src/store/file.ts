import { create } from "zustand";

type FileStore = {
  currentFile: string | null;
  setCurrentFile: (currentFile: string | null) => void;
  fileContent: string;
  setFileContent: (fileContent: string) => void;
  isSaved: boolean;
  setSaved: (isItSaved: boolean) => void;
  isSaving: boolean;
  setSaving: (isItSaving: boolean) => void;
  isAboutOpen: boolean;
  setAboutOpen: (isItOpen: boolean) => void;
};

const useFileState = create<FileStore>((set) => ({
  currentFile: null,
  setCurrentFile: (currentFile: string | null) => set({ currentFile }),
  fileContent: "",
  setFileContent: (fileContent: string) => set({ fileContent }),
  isSaved: true,
  setSaved: (isItSaved: boolean) => set({ isSaved: isItSaved }),
  isSaving: false,
  setSaving: (isItSaving: boolean) => set({ isSaving: isItSaving }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
}));

export default useFileState;
