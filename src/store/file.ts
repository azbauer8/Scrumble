import { Editor } from "@tiptap/react";
import { create } from "zustand";

function splitPath(fullPath: string): string[] {
  const regex = /[\\/]/; // Regular expression matching / or \
  return fullPath.split(regex);
}

type FileStore = {
  editorRef: Editor | null;
  setEditorRef: (editor: Editor | null) => void;
  fileName: string;
  filePath: string;
  setFilePath: (filePath: string) => void;
  fileContent: string;
  setFileContent: (fileContent: string) => void;
  isSaved: boolean;
  setSaved: (isItSaved: boolean) => void;
  isAboutOpen: boolean;
  setAboutOpen: (isItOpen: boolean) => void;
};

const useFileState = create<FileStore>((set) => ({
  editorRef: null,
  setEditorRef: (editor: Editor | null) => set({ editorRef: editor }),
  fileName: "",
  filePath: "",
  setFilePath: (newfilePath: string) => {
    set({ filePath: newfilePath });
    const path = splitPath(newfilePath);
    set({ fileName: path[path.length - 1] });
  },
  fileContent: "",
  setFileContent: (newContent: string) => set({ fileContent: newContent }),
  isSaved: false,
  setSaved: (isItSaved: boolean) => set({ isSaved: isItSaved }),
  isAboutOpen: false,
  setAboutOpen: (isItOpen: boolean) => set({ isAboutOpen: isItOpen }),
}));

export default useFileState;
