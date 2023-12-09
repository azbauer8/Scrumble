import { invoke } from "@tauri-apps/api/tauri";
import { save, open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

export const openFile = async (
  setMarkdown: (markdown: string) => void,
  setSavePath: (savePath: string) => void,
  setFileOpened: (fileOpened: boolean) => void
) => {
  try {
    const selectedPath = await open({
      title: "Open Markdown File",
      filters: [
        {
          name: "Markdown",
          extensions: ["md"],
        },
      ],
    });
    if (!selectedPath) return;
    setSavePath(selectedPath as string);
    const markdown = await readTextFile(selectedPath as string);
    setMarkdown(markdown);
    setFileOpened(true);
  } catch (err) {
    console.error(err);
  }
};

export const saveFile = async (
  markdown: string,
  savePath: string,
  setSavePath: (savePath: string) => void
) => {
  if (savePath) {
    try {
      await invoke("save_file", {
        path: savePath,
        content: markdown,
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const newSavePath = await save({
        title: "Save Markdown File",
        defaultPath: "Untitled.md",
        filters: [
          {
            name: "Markdown",
            extensions: ["md"],
          },
        ],
      });
      if (!newSavePath) return;
      await invoke("save_file", {
        path: newSavePath,
        content: markdown,
      }).then(() => {
        newSavePath && setSavePath(newSavePath);
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export const saveFileAs = async (
  markdown: string,
  setSavePath: (savePath: string) => void
) => {
  try {
    const newSavePath = await save({
      title: "Save Markdown File",
      defaultPath: "Untitled.md",
      filters: [
        {
          name: "Markdown",
          extensions: ["md"],
        },
      ],
    });
    if (!newSavePath) return;
    await invoke("save_file", {
      path: newSavePath,
      content: markdown,
    }).then(() => {
      newSavePath && setSavePath(newSavePath);
    });
  } catch (err) {
    console.error(err);
  }
};
