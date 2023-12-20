import {
  save as saveFilePicker,
  open as openFilePicker,
} from "@tauri-apps/api/dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { Editor } from "@tiptap/react";
import { notifications } from "@mantine/notifications";
export const fileExtensions = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
];

export function New(
  editor: Editor | null,
  setFilePath: { (filePath: string): void },
  setFileContent: { (fileContent: string): void }
) {
  setFileContent("");
  setFilePath("");
  editor?.commands.setContent("");
}

export async function Open(
  editor: Editor | null,
  setFilePath: { (filePath: string): void },
  setFileContent: { (fileContent: string): void }
) {
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
  notifications.show({
    title: "Opened new file",
    message: selected as string,
    color: "teal",
    withBorder: true,
  });
}

export async function Save(
  filePath: string,
  setFilePath: { (filePath: string): void },
  fileContent: string,
  isSaved: boolean,
  setSaved: { (isItSaved: boolean): void }
) {
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
  } else {
    notifications.show({
      title: "File is already saved",
      message: "No action needed",
      color: "yellow",
      withBorder: true,
    });
  }
}

export async function SaveAs(
  setFilePath: { (filePath: string): void },
  fileContent: string,
  setSaved: { (isItSaved: boolean): void }
) {
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
