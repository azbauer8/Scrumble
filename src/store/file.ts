import { create } from "zustand";
import { ReactFrameworkOutput } from "@remirror/react";
import { updateFileJson } from "../utils/settingsOps";
import { Extensions } from "@/components/Editor/exts";
import { FileEntry } from "@tauri-apps/api/fs";

type FileStore = {
  editorRef: ReactFrameworkOutput<Extensions> | null;
  setEditorRef: (editor: any) => void;
  fileName: string;
  filePath: string;
  setFilePath: (filePath: string) => void;
  fileContent: string;
  setFileContent: (fileContent: string) => void;
  isSaved: boolean;
  setSaved: (isItSaved: boolean) => void;
  openDirectory: string;
  setOpenDirectory: (openDirectory: string) => void;
  openDirFiles: FileEntry[];
  addOpenDirFile: (file: FileEntry) => void;
  setOpenDirFiles: (openDirFiles: FileEntry[]) => void;
  clearOpenDirFiles: () => void;
};

const useFileState = create<FileStore>((set) => ({
  editorRef: null,
  setEditorRef: (editor) => set({ editorRef: editor }),
  fileName: "",
  filePath: "",
  setFilePath: (newfilePath: string) => {
    set({ filePath: newfilePath });
    const path = newfilePath.split(/[\\/]/);
    set({ fileName: path[path.length - 1] });
    updateFileJson(newfilePath);
  },
  fileContent: "",
  setFileContent: (newContent: string) => set({ fileContent: newContent }),
  isSaved: true,
  setSaved: (isItSaved: boolean) => set({ isSaved: isItSaved }),
  openDirectory: "",
  setOpenDirectory: (openDirectory: string) => set({ openDirectory }),
  openDirFiles: [],
  addOpenDirFile: (file: FileEntry) =>
    set((state) => ({ openDirFiles: [...state.openDirFiles, file] })),
  setOpenDirFiles: (openDirFiles: FileEntry[]) => set({ openDirFiles }),
  clearOpenDirFiles: () => set({ openDirFiles: [] }),
}));

export default useFileState;
