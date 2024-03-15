import useFileStore from "@/store/fileStore"
import useSettingsStore from "@/store/settingsStore"
import { notifications } from "@mantine/notifications"
import { ask, open, save } from "@tauri-apps/api/dialog"
import { readDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs"
import { documentDir } from "@tauri-apps/api/path"

export const fileExtensions = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
]

export async function newFile() {
  const filePath = useFileStore.getState().filePath
  const setFilePath = useFileStore.getState().setFilePath
  const isSaved = useFileStore.getState().isSaved
  const setSaved = useFileStore.getState().setSaved
  const editor = useFileStore.getState().editor

  if (!isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" },
    )
    if (response) {
      filePath ? await saveFile() : await saveFileAs()
    }
  }
  setFilePath("")
  editor?.commands.setContent("")
  setSaved(true)
  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFile("")
  }
}

export async function openFile() {
  const filePath = useFileStore.getState().filePath
  const setFilePath = useFileStore.getState().setFilePath
  const isSaved = useFileStore.getState().isSaved
  const setSaved = useFileStore.getState().setSaved
  const editor = useFileStore.getState().editor
  if (!isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" },
    )
    if (response) {
      filePath ? await saveFile() : await saveFileAs()
    }
  }
  const selected = await open({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  })
  if (selected === null) {
    notifications.show({
      title: "Open dialog closed",
      message: "No file selected",
      color: "yellow",
    })
    return
  }
  const openedContents = await readTextFile(selected as string)
  editor?.commands.setContent(openedContents)
  setFilePath(selected as string)
  setSaved(true)

  notifications.show({
    title: "Opened file",
    message: selected as string,
    color: "green",
  })
  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFile(selected as string)
  }
}

export async function openFilePath(path: string, saveCheck?: boolean) {
  const filePath = useFileStore.getState().filePath
  const setFilePath = useFileStore.getState().setFilePath
  const isSaved = useFileStore.getState().isSaved
  const setSaved = useFileStore.getState().setSaved
  const editor = useFileStore.getState().editor

  if (saveCheck && !isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" },
    )
    if (response) {
      filePath ? await saveFile() : await saveFileAs()
    }
  }
  const openedContents = await readTextFile(path)
  editor?.commands.setContent(openedContents)
  setFilePath(path)
  setSaved(true)
  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFile(path)
  }
}

export async function openFolder() {
  const setOpenFolder = useFileStore.getState().setOpenFolder
  const addFilesInOpenFolder = useFileStore.getState().addFilesInOpenFolder
  const clearFilesInOpenFolder = useFileStore.getState().clearFilesInOpenFolder

  const selected = await open({
    directory: true,
    defaultPath: await documentDir(),
  })
  if (selected === null) {
    notifications.show({
      title: "Open dialog closed",
      message: "No folder selected",
      color: "yellow",
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

  notifications.show({
    title: "Opened folder",
    message: selected as string,
    color: "green",
  })

  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFolder(selected as string)
  }
}

export async function openFolderFromPath(path: string) {
  const setOpenFolder = useFileStore.getState().setOpenFolder
  const addFilesInOpenFolder = useFileStore.getState().addFilesInOpenFolder
  const clearFilesInOpenFolder = useFileStore.getState().clearFilesInOpenFolder
  clearFilesInOpenFolder()
  setOpenFolder(path)
  const entries = await readDir(path, { recursive: true })

  for (const entry of entries) {
    addFilesInOpenFolder(entry)
  }

  notifications.show({
    title: "Opened folder",
    message: path,
    color: "green",
  })

  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFolder(path)
  }
}

export async function saveFile() {
  const path = useFileStore.getState().filePath
  const setPath = useFileStore.getState().setFilePath
  const contents = useFileStore
    .getState()
    .editor?.storage.markdown.getMarkdown()
  const isSaved = useFileStore.getState().isSaved
  const setSaved = useFileStore.getState().setSaved
  // no action needed if already saved
  if (!isSaved) {
    // show save as dialog if no file path
    let newPath = null
    if (!path) {
      newPath = await save({
        defaultPath: await documentDir(),
        filters: fileExtensions,
      })
      // if user cancelled out of save dialog, return and don't save
      if (newPath === null) {
        notifications.show({
          title: "Save dialog closed",
          message: "Your file will not be saved",
          color: "yellow",
        })
        return
      }
      setPath(newPath)
    }
    try {
      await writeTextFile({ path: newPath ?? path, contents })
      setSaved(true)

      notifications.show({
        title: "Save successful",
        message: `Saved to: ${path}`,
        color: "green",
      })
    } catch (e) {
      notifications.show({
        title: "Error occurred while saving file",
        message: (e as Error).message,
        color: "red",
      })
    }
  }
}

export async function saveFileAs() {
  const setFilePath = useFileStore.getState().setFilePath
  const contents = useFileStore
    .getState()
    .editor?.storage.markdown.getMarkdown()
  const setSaved = useFileStore.getState().setSaved
  // show save as dialog
  const path = await save({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  })
  // if user cancelled out of save dialog, return and don't save
  if (path === null) {
    notifications.show({
      title: "Save dialog closed",
      message: "Your file will not be saved",
      color: "yellow",
    })
    return
  }
  setFilePath(path)

  try {
    await writeTextFile({ path: path, contents })
    setSaved(true)
    notifications.show({
      title: "Save successful",
      message: `Saved to: ${path}`,
      color: "green",
    })
  } catch (e) {
    notifications.show({
      title: "Error occurred while saving file",
      message: (e as Error).message,
      color: "red",
    })
  }
}
