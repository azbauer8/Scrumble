import { Editor } from "@tiptap/react";
import { create } from "zustand";

type FileStore = {
  editorRef: Editor | null;
  setEditorRef: (editor: Editor | null) => void;
  filePath: string;
  setFilePath: (filePath: string) => void;
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
  editorRef: null,
  setEditorRef: (editor: Editor | null) => set({ editorRef: editor }),
  filePath: "",
  setFilePath: (filePath: string) => set({ filePath }),
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
