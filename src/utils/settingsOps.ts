import useSettingsState from "@/store/settings";
import {
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";

import { OpenFolderFromPath, OpenPath } from "./fileOps";

export async function updateJson() {
  const settings = useSettingsState.getState().settings;

  const appDataDirPath = await appDataDir();
  const pathExists = await exists(appDataDirPath);

  if (!pathExists) {
    await createDir(appDataDirPath);
  }

  await writeTextFile(
    `${appDataDirPath}/settings.json`,
    JSON.stringify(settings)
  );
}

export async function setStateFromJson() {
  const appDataDirPath = await appDataDir();
  const pathExists = await exists(appDataDirPath);
  if (pathExists) {
    const settings = JSON.parse(
      await readTextFile(`${appDataDirPath}/settings.json`)
    );
    useSettingsState.getState().setSettings(settings);
    if (settings.openOnStartup === "Previous File and Folder") {
      setEditorFromFileSettings("Previous File and Folder");
    } else if (settings.openOnStartup === "Custom Folder") {
      setEditorFromFileSettings("Custom Folder");
    }
  }
}

export async function updateFileJson(
  previousFile: string,
  previousFolder?: string
) {
  const appDataDirPath = await appDataDir();
  const pathExists = await exists(appDataDirPath);

  if (!pathExists) {
    await createDir(appDataDirPath);
  }
  const data = previousFolder
    ? JSON.stringify({
        previousFile: previousFile,
        previousFolder: previousFolder,
      })
    : JSON.stringify({
        previousFile: previousFile,
      });
  await writeTextFile(`${appDataDirPath}/file_settings.json`, data);
}

export async function setEditorFromFileSettings(
  setting: "Previous File and Folder" | "Custom Folder"
) {
  const appDataDirPath = await appDataDir();
  const pathExists = await exists(appDataDirPath);
  if (pathExists) {
    if (setting === "Previous File and Folder") {
      const fileSettings = JSON.parse(
        await readTextFile(`${appDataDirPath}/file_settings.json`)
      );
      const previousFileExists = await exists(fileSettings.previousFile);
      if (previousFileExists) {
        OpenPath(fileSettings.previousFile);
      }
      const previousFolderExists = await exists(fileSettings.previousFolder);
      if (previousFolderExists) {
        OpenFolderFromPath(fileSettings.previousFolder);
      }
    } else if (setting === "Custom Folder") {
      const settings = JSON.parse(
        await readTextFile(`${appDataDirPath}/settings.json`)
      );
      const customFolderExists = await exists(settings.customStartupFolder);
      if (customFolderExists) {
        OpenFolderFromPath(settings.customStartupFolder);
      }
    }
  }
}
