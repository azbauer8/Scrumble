import type { FileEntry } from "@tauri-apps/api/fs"
import type { Editor } from "@tiptap/react"
import { create } from "zustand"

interface FileStore {
  editor: Editor | null
  setEditor: (editor: Editor) => void
  fileName: string
  filePath: string
  setFilePath: (filePath: string) => void
  isSaved: boolean
  setSaved: (isSaved: boolean) => void
  openFolder: string
  setOpenFolder: (openFolder: string) => void
  filesInOpenFolder: FileEntry[]
  addFilesInOpenFolder: (file: FileEntry) => void
  setFilesInOpenFolder: (filesInOpenFolder: FileEntry[]) => void
  clearFilesInOpenFolder: () => void
}

const useFileStore = create<FileStore>()((set) => ({
  editor: null,
  setEditor: (editor) => set(() => ({ editor })),
  fileName: "",
  filePath: "",
  setFilePath: (newfilePath: string) => {
    set({ filePath: newfilePath })
    const path = newfilePath.split(/[\\/]/)
    set({ fileName: path[path.length - 1].slice(0, -3) })
    // updateFileJson(newfilePath, useFileState.getState().openFolder)
  },
  isSaved: false,
  setSaved: (isSaved) => set(() => ({ isSaved })),
  openFolder: "",
  setOpenFolder: (openFolder: string) => {
    set({ openFolder: openFolder })
    // updateFileJson(useFileState.getState().filePath, openFolder)
  },
  filesInOpenFolder: [],
  addFilesInOpenFolder: (file: FileEntry) =>
    set((state) => ({ filesInOpenFolder: [...state.filesInOpenFolder, file] })),
  setFilesInOpenFolder: (filesInOpenFolder: FileEntry[]) =>
    set({ filesInOpenFolder: filesInOpenFolder }),
  clearFilesInOpenFolder: () => set({ filesInOpenFolder: [] }),
}))

export default useFileStore
