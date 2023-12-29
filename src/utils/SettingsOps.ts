import { appDataDir } from "@tauri-apps/api/path";
import {
  writeTextFile,
  readTextFile,
  createDir,
  exists,
} from "@tauri-apps/api/fs";
import useSettingsState from "../store/settings";
import { OpenPath } from "./fileOps";

export async function UpdateJson() {
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
    if (
      useSettingsState.getState().settings.openOnStartup === "Previous File"
    ) {
      setEditorFromFileJson();
    }
  }
}

export async function updateFileJson(path: string) {
  const appDataDirPath = await appDataDir();
  const pathExists = await exists(appDataDirPath);

  if (!pathExists) {
    await createDir(appDataDirPath);
  }
  await writeTextFile(
    `${appDataDirPath}/file_settings.json`,
    JSON.stringify({
      previousFile: path,
    })
  );
}

export async function setEditorFromFileJson() {
  const appDataDirPath = await appDataDir();
  const fileSettings = JSON.parse(
    await readTextFile(`${appDataDirPath}/file_settings.json`)
  );
  const pathExists = await exists(fileSettings.previousFile);
  if (pathExists) {
    OpenPath(fileSettings.previousFile);
  }
}
