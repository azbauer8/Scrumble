import useFileState from "@/store/file"
import { ask, open, save } from "@tauri-apps/api/dialog"
import { readDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs"
import { documentDir } from "@tauri-apps/api/path"
import { toast } from "sonner"

export const fileExtensions = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
]

export async function New() {
  const filePath = useFileState.getState().filePath
  const setFilePath = useFileState.getState().setFilePath
  const setFileContent = useFileState.getState().setFileContent
  const isSaved = useFileState.getState().isSaved
  const setSaved = useFileState.getState().setSaved

  const editor = useFileState.getState().editorRef
  if (!isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" }
    )
    if (response) {
      filePath ? await Save() : await SaveAs()
    }
  }
  setFilePath("")
  setFileContent("")
  editor?.clearContent()
  setSaved(true)
}

export async function Open() {
  const filePath = useFileState.getState().filePath
  const setFilePath = useFileState.getState().setFilePath
  const setFileContent = useFileState.getState().setFileContent
  const isSaved = useFileState.getState().isSaved
  const setSaved = useFileState.getState().setSaved
  const editor = useFileState.getState().editorRef
  if (!isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" }
    )
    if (response) {
      filePath ? await Save() : await SaveAs()
    }
  }
  const selected = await open({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  })
  if (selected === null) {
    toast.warning("Open dialog closed", {
      description: "No file selected",
    })
    return
  }
  const openedContents = await readTextFile(selected as string)
  setFileContent(openedContents)
  editor?.clearContent()
  editor?.commands.insertMarkdown(openedContents)
  setFilePath(selected as string)
  setSaved(true)

  toast.success("Opened file", {
    description: selected as string,
  })
}

export async function OpenPath(path: string, saveCheck?: boolean) {
  const filePath = useFileState.getState().filePath
  const setFilePath = useFileState.getState().setFilePath
  const setFileContent = useFileState.getState().setFileContent
  const isSaved = useFileState.getState().isSaved
  const setSaved = useFileState.getState().setSaved
  const editor = useFileState.getState().editorRef

  if (saveCheck && !isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" }
    )
    if (response) {
      filePath ? await Save() : await SaveAs()
    }
  }
  const openedContents = await readTextFile(path)
  setFileContent(openedContents)
  editor?.clearContent()
  editor?.commands.insertMarkdown(openedContents)
  setFilePath(path)
  setSaved(true)
}

export async function OpenFolder() {
  const setOpenFolder = useFileState.getState().setOpenFolder
  const addFilesInOpenFolder = useFileState.getState().addFilesInOpenFolder
  const clearFilesInOpenFolder = useFileState.getState().clearFilesInOpenFolder

  const selected = await open({
    directory: true,
    defaultPath: await documentDir(),
  })
  if (selected === null) {
    toast.warning("Open dialog closed", {
      description: "No folder selected",
    })
    return
  }
  clearFilesInOpenFolder()
  setOpenFolder(selected as string)
  const entries = await readDir(selected as string)

  for (const entry of entries) {
    if (entry.path.slice(-3) === ".md") {
      addFilesInOpenFolder(entry)
    }
  }

  toast.success("Opened folder", {
    description: selected as string,
  })
}

export async function OpenFolderFromPath(path: string) {
  const setOpenFolder = useFileState.getState().setOpenFolder
  const addFilesInOpenFolder = useFileState.getState().addFilesInOpenFolder
  const clearFilesInOpenFolder = useFileState.getState().clearFilesInOpenFolder
  clearFilesInOpenFolder()
  setOpenFolder(path)
  const entries = await readDir(path, { recursive: true })

  for (const entry of entries) {
    addFilesInOpenFolder(entry)
  }

  toast.success("Opened folder", {
    description: path,
  })
}

export async function Save() {
  const filePath = useFileState.getState().filePath
  const setFilePath = useFileState.getState().setFilePath
  const fileContent = useFileState.getState().fileContent
  const isSaved = useFileState.getState().isSaved
  const setSaved = useFileState.getState().setSaved
  // no action needed if already saved
  if (!isSaved) {
    // show save as dialog if no file path
    if (!filePath) {
      const newPath = await save({
        defaultPath: await documentDir(),
        filters: fileExtensions,
      })
      // if user cancelled out of save dialog, return and don't save
      if (newPath === null) {
        toast.warning("Save dialog closed", {
          description: "Your file will not be saved",
        })
        return
      }
      setFilePath(newPath)
    }
    try {
      await writeTextFile({ path: filePath, contents: fileContent })
      setSaved(true)
      toast.success("Save successful", {
        description: `Saved to: ${filePath}`,
      })
    } catch (e) {
      toast.error("Error occurred while saving file", {
        description: (e as Error).message,
      })
    }
  }
}

export async function SaveAs() {
  const setFilePath = useFileState.getState().setFilePath
  const fileContent = useFileState.getState().fileContent
  const setSaved = useFileState.getState().setSaved
  // show save as dialog
  const path = await save({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  })
  // if user cancelled out of save dialog, return and don't save
  if (path === null) {
    toast.warning("Save dialog closed", {
      description: "Your file will not be saved",
    })
    return
  }
  setFilePath(path)

  try {
    await writeTextFile({ path: path, contents: fileContent })
    setSaved(true)
    toast.success("Save successful", {
      description: `Saved to: ${path}`,
    })
    // });
  } catch (e) {
    toast.error("Error occurred while saving file", {
      description: (e as Error).message,
    })
  }
}
