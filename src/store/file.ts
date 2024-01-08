import { updateFileJson } from "@/utils/settingsOps"
import { ReactFrameworkOutput } from "@remirror/react"
import { FileEntry } from "@tauri-apps/api/fs"
import { create } from "zustand"

import { Extensions } from "@/components/Editor/exts"

type FileStore = {
  editorRef: ReactFrameworkOutput<Extensions> | null
  setEditorRef: (editor: any) => void
  fileName: string
  filePath: string
  setFilePath: (filePath: string) => void
  fileContent: string
  setFileContent: (fileContent: string) => void
  isSaved: boolean
  setSaved: (isItSaved: boolean) => void
  openFolder: string
  setOpenFolder: (openFolder: string) => void
  filesInOpenFolder: FileEntry[]
  addFilesInOpenFolder: (file: FileEntry) => void
  setFilesInOpenFolder: (filesInOpenFolder: FileEntry[]) => void
  clearFilesInOpenFolder: () => void
}

const useFileState = create<FileStore>((set) => ({
  editorRef: null,
  setEditorRef: (editor) => set({ editorRef: editor }),
  fileName: "",
  filePath: "",
  setFilePath: (newfilePath: string) => {
    set({ filePath: newfilePath })
    const path = newfilePath.split(/[\\/]/)
    set({ fileName: path[path.length - 1] })
    updateFileJson(newfilePath, useFileState.getState().openFolder)
  },
  fileContent: "",
  setFileContent: (newContent: string) => set({ fileContent: newContent }),
  isSaved: true,
  setSaved: (isItSaved: boolean) => set({ isSaved: isItSaved }),
  openFolder: "",
  setOpenFolder: (openFolder: string) => {
    set({ openFolder: openFolder })
    updateFileJson(useFileState.getState().filePath, openFolder)
  },
  filesInOpenFolder: [],
  addFilesInOpenFolder: (file: FileEntry) =>
    set((state) => ({ filesInOpenFolder: [...state.filesInOpenFolder, file] })),
  setFilesInOpenFolder: (filesInOpenFolder: FileEntry[]) =>
    set({ filesInOpenFolder: filesInOpenFolder }),
  clearFilesInOpenFolder: () => set({ filesInOpenFolder: [] }),
}))

export default useFileState
