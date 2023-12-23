import {
  save as saveFilePicker,
  open as openFilePicker,
  ask as askDialog,
} from "@tauri-apps/api/dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { notifications } from "@mantine/notifications";
import useFileState from "../store/file";

export const fileExtensions = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
];

export async function New() {
  const filePath = useFileState.getState().filePath;
  const setFilePath = useFileState.getState().setFilePath;
  const setFileContent = useFileState.getState().setFileContent;
  const isSaved = useFileState.getState().isSaved;
  const setSaved = useFileState.getState().setSaved;

  const editor = useFileState.getState().editorRef;
  if (!isSaved) {
    const response = await askDialog(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" }
    );
    if (response) {
      filePath ? await Save() : await SaveAs();
    }
  }
  setFilePath("");
  setFileContent("");
  editor?.commands.setContent("");
  setSaved(true);
}

export async function Open() {
  const filePath = useFileState.getState().filePath;
  const setFilePath = useFileState.getState().setFilePath;
  const setFileContent = useFileState.getState().setFileContent;
  const isSaved = useFileState.getState().isSaved;
  const setSaved = useFileState.getState().setSaved;
  const editor = useFileState.getState().editorRef;
  if (!isSaved) {
    const response = await askDialog(
      "The current file is unsaved, do you want to save it first?",
      { title: "Warning", type: "warning" }
    );
    if (response) {
      filePath ? await Save() : await SaveAs();
    }
  }
  const selected = await openFilePicker({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  });
  if (selected === null) {
    notifications.show({
      title: "Open dialog closed",
      message: "No file selected",
      color: "red",
      withBorder: true,
    });
    return;
  }
  const openedContents = await readTextFile(selected as string);
  setFileContent(openedContents);
  editor?.commands.setContent(openedContents);
  setFilePath(selected as string);
  setSaved(true);
  notifications.show({
    title: "Opened file",
    message: selected as string,
    color: "teal",
    withBorder: true,
  });
}

export async function OpenPath(path: string) {
  const setFilePath = useFileState.getState().setFilePath;
  const setFileContent = useFileState.getState().setFileContent;
  const setSaved = useFileState.getState().setSaved;
  const editor = useFileState.getState().editorRef;

  const openedContents = await readTextFile(path);
  setFileContent(openedContents);
  editor?.commands.setContent(openedContents);
  setFilePath(path);
  setSaved(true);
}

export async function Save() {
  const filePath = useFileState.getState().filePath;
  const setFilePath = useFileState.getState().setFilePath;
  const fileContent = useFileState.getState().fileContent;
  const isSaved = useFileState.getState().isSaved;
  const setSaved = useFileState.getState().setSaved;
  let path = filePath;
  // no action needed if already saved
  if (!isSaved) {
    // show save as dialog if no file path
    if (!path) {
      const newPath = await saveFilePicker({
        defaultPath: await documentDir(),
        filters: fileExtensions,
      });
      // if user cancelled out of save dialog, return and don't save
      if (newPath === null) {
        notifications.show({
          title: "Save dialog closed",
          message: "Your file will not be saved",
          color: "red",
          withBorder: true,
        });
        return;
      }
      path = newPath;
      setFilePath(path);
    }
    try {
      await writeTextFile({ path: path, contents: fileContent });
      setSaved(true);
      notifications.show({
        title: "Save successful",
        message: `Saved to: ${path}`,
        color: "teal",
        withBorder: true,
      });
    } catch (e) {
      notifications.show({
        title: "Error occurred while saving file",
        message: (e as Error).message,
        color: "red",
        withBorder: true,
      });
    }
  }
}

export async function SaveAs() {
  const setFilePath = useFileState.getState().setFilePath;
  const fileContent = useFileState.getState().fileContent;
  const setSaved = useFileState.getState().setSaved;
  // show save as dialog
  const path = await saveFilePicker({
    defaultPath: await documentDir(),
    filters: fileExtensions,
  });
  // if user cancelled out of save dialog, return and don't save
  if (path === null) {
    notifications.show({
      title: "Save dialog closed",
      message: "Your file will not be saved",
      color: "red",
      withBorder: true,
    });
    return;
  }
  setFilePath(path);

  try {
    await writeTextFile({ path: path, contents: fileContent });
    setSaved(true);
    notifications.show({
      title: "Save successful",
      message: `Saved to: ${path}`,
      color: "teal",
      withBorder: true,
    });
  } catch (e) {
    notifications.show({
      title: "Error occurred while saving file",
      message: (e as Error).message,
      color: "red",
      withBorder: true,
    });
  }
}
