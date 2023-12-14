import { save as saveFilePicker } from "@tauri-apps/api/dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { confirm } from "@tauri-apps/api/dialog";
import { atom } from "jotai";

export const availbleExts = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
];

/*
 * Current file path. If you change this, then contentJotai & savedJotai will be updated (Means 'Open')
 * If it's null, contentJotai will be set to null (Means 'New')
 */
export const currentFileState = atom(
  null,
  async (get, set, value: string | null) => {
    if (!get(isSavedState)) {
      const result = await confirm("Do you need to save and then exit?", {
        title: "You haven't saved it yet",
        type: "warning",
      });

      if (result) await set(isSavingState, true);
    }

    set(currentFileState, value);

    if (value !== null) {
      try {
        const textContent = await readTextFile(value);
        set(fileContentState, textContent);
      } catch (e) {
        alert(`Error occurred while opening file:\n${(e as Error).message}`);
      }
    } else {
      set(fileContentState, "");
    }
    set(isSavedState, true);
  }
);

export const isSavedState = atom(true);

/**
 * Whether editor is saving a file.
 * If you change this, Editor will save content to your file(Means 'Save' or 'Save as')
 */
export const isSavingState = atom(false, async (get, set, value: boolean) => {
  set(isSavingState, value);
  if (!value) return;

  let path: string | null = get(currentFileState);
  if (path === null) {
    path = await saveFilePicker({
      defaultPath: await documentDir(),
      filters: availbleExts,
    });
    if (path === null) {
      set(isSavingState, false);
      return;
    }
  }

  try {
    await writeTextFile({ path, contents: get(fileContentState) });
    set(isSavedState, true);
  } catch (e) {
    alert(`Error occurred while saving file:\n${(e as Error).message}`);
  }
  set(isSavingState, false);
});

export const fileContentState = atom(
  `
# Scrumble
> A Markdown editor powered by [Milkdown](https://milkdown.dev/).
*   Features
    *   [x] 📝 **WYSIWYG Markdown**
    *   [x] 🎨 **Minimal Design using Fluent UI**
    *   [x] 🚀 **Lightweight**
`,
  (get, set, value: string) => {
    if (value.trim() !== get(fileContentState).trim()) {
      set(fileContentState, value);
      set(isSavedState, false);
    }
  }
);
