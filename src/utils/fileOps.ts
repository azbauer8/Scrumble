import useFileStore from "@/store/fileStore"
import useSettingsStore from "@/store/settingsStore"
import { notifications } from "@mantine/notifications"
import { ask, open, save } from "@tauri-apps/api/dialog"
import {
  type FileEntry,
  exists,
  readDir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs"
import { documentDir } from "@tauri-apps/api/path"

export const fileExtensions = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
]

export async function newFile() {
  const filePath = useFileStore.getState().filePath

  if (!useFileStore.getState().isSaved) {
    const response = await ask(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" },
    )
    if (response) {
      filePath ? await saveFile() : await saveFileAs()
    }
  }
  useFileStore.getState().setFilePath("")
  useFileStore.getState().editor?.commands.clearContent()
  useFileStore.getState().setSaved(true)
  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFile("")
  }
}

export async function openFile() {
  const filePath = useFileStore.getState().filePath
  if (!useFileStore.getState().isSaved) {
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
  useFileStore.getState().editor?.commands.setContent(openedContents)
  useFileStore.getState().setFilePath(selected as string)
  useFileStore.getState().setSaved(true)

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

export async function openFilePath(path: string, saveCheck: boolean) {
  const filePath = useFileStore.getState().filePath
  const isSaved = useFileStore.getState().isSaved

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
  useFileStore.getState().editor?.commands.setContent(openedContents)
  useFileStore.getState().setFilePath(path)
  useFileStore.getState().setSaved(true)
  if (
    useSettingsStore.getState().settings.openOnStartup ===
    "Previous File and Folder"
  ) {
    useSettingsStore.getState().setPreviousFile(path)
  }
}

export async function openFolderFromDialog() {
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
  useFileStore.getState().clearFilesInOpenFolder()
  useFileStore.getState().setOpenFolder(selected as string)
  const entries = await readDir(selected as string, {
    recursive: true,
  })

  addEntriesFromFolder(entries)

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
  useFileStore.getState().clearFilesInOpenFolder()
  useFileStore.getState().setOpenFolder(path)
  const entries = await readDir(path, { recursive: true })
  addEntriesFromFolder(entries)

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

function addEntriesFromFolder(entries: FileEntry[]) {
  for (const entry of entries) {
    const { path, name, children } = entry
    if (name?.endsWith(".md")) {
      const newEntry = {
        id: path,
        name: name,
        children: undefined,
      }
      useFileStore.getState().addFilesInOpenFolder(newEntry)
    } else if (children) {
      const validChildren =
        children?.filter((child) => child.name?.endsWith(".md")).length > 0
      if (validChildren) {
        const newEntry = {
          id: path,
          name: name,
          children: children
            ?.filter((child) => child.name?.endsWith(".md"))
            .map((child) => ({
              id: child.path,
              name: child.name,
            })),
        }
        useFileStore.getState().addFilesInOpenFolder(newEntry)
      }
    }
  }
}

export async function saveFile() {
  const path = useFileStore.getState().filePath
  const contents = useFileStore
    .getState()
    .editor?.storage.markdown.getMarkdown()
  // no action needed if already saved
  if (!useFileStore.getState().isSaved) {
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
      useFileStore.getState().setFilePath(newPath)
    }
    try {
      await writeTextFile({ path: newPath ?? path, contents })
      useFileStore.getState().setSaved(true)
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
  const contents = useFileStore
    .getState()
    .editor?.storage.markdown.getMarkdown()
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
  useFileStore.getState().setFilePath(path)

  try {
    await writeTextFile({ path: path, contents })
    useFileStore.getState().setSaved(true)
  } catch (e) {
    notifications.show({
      title: "Error occurred while saving file",
      message: (e as Error).message,
      color: "red",
    })
  }
}

export async function setEditorFromFileSettings(
  setting: "Previous File and Folder" | "Custom Folder",
) {
  if (setting === "Previous File and Folder") {
    const previousFile = useSettingsStore.getState().settings.previousFile
    const previousFolder = useSettingsStore.getState().settings.previousFolder

    const previousFileExists = previousFile ? await exists(previousFile) : false
    if (previousFileExists) {
      openFilePath(previousFile, false)
    }

    const previousFolderExists = previousFolder
      ? await exists(previousFolder)
      : false
    if (previousFolderExists) {
      openFolderFromPath(previousFolder)
    }
  } else if (setting === "Custom Folder") {
    const customStartupFolder =
      useSettingsStore.getState().settings.customStartupFolder
    const customFolderExists = customStartupFolder
      ? await exists(customStartupFolder)
      : false
    if (customFolderExists) {
      openFolderFromPath(customStartupFolder)
    }
  }
}
