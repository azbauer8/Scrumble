import { Editor } from "@tiptap/react";
import { create } from "zustand";

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
};

const useFileState = create<FileStore>((set) => ({
  editorRef: null,
  setEditorRef: (editor: Editor | null) => set({ editorRef: editor }),
  fileName: "",
  filePath: "",
  setFilePath: (newfilePath: string) => {
    set({ filePath: newfilePath });
    const path = newfilePath.split(/[\\/]/);
    set({ fileName: path[path.length - 1] });
  },
  fileContent: "",
  setFileContent: (newContent: string) => set({ fileContent: newContent }),
  isSaved: false,
  setSaved: (isItSaved: boolean) => set({ isSaved: isItSaved }),
}));

export default useFileState;
