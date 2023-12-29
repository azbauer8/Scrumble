import {
  save as saveFilePicker,
  open as openFilePicker,
  ask as askDialog,
} from "@tauri-apps/api/dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { toast } from "sonner";
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
  editor?.clearContent();
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
    toast.warning("Open dialog closed", {
      description: "No file selected",
    });
    return;
  }
  const openedContents = await readTextFile(selected as string);
  setFileContent(openedContents);
  editor?.clearContent();
  editor?.commands.insertMarkdown(openedContents);
  setFilePath(selected as string);
  setSaved(true);

  toast.success("Opened file", {
    description: selected as string,
  });
}

export async function OpenPath(path: string) {
  const setFilePath = useFileState.getState().setFilePath;
  const setFileContent = useFileState.getState().setFileContent;
  const setSaved = useFileState.getState().setSaved;
  const editor = useFileState.getState().editorRef;

  const openedContents = await readTextFile(path);
  setFileContent(openedContents);
  editor?.clearContent();
  editor?.commands.insertMarkdown(openedContents);
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
        toast.warning("Save dialog closed", {
          description: "Your file will not be saved",
        });
        return;
      }
      path = newPath;
      setFilePath(path);
    }
    try {
      await writeTextFile({ path: path, contents: fileContent });
      setSaved(true);
      toast.success("Save successful", {
        description: `Saved to: ${path}`,
      });
    } catch (e) {
      toast.error("Error occurred while saving file", {
        description: (e as Error).message,
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
    toast.warning("Save dialog closed", {
      description: "Your file will not be saved",
    });
    return;
  }
  setFilePath(path);

  try {
    await writeTextFile({ path: path, contents: fileContent });
    setSaved(true);
    toast.success("Save successful", {
      description: `Saved to: ${path}`,
    });
    // });
  } catch (e) {
    toast.error("Error occurred while saving file", {
      description: (e as Error).message,
    });
  }
}
