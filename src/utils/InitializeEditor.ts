import { type as getType } from "@tauri-apps/api/os";
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import useOSState from "../store/os";
import { useInterval, useWindowEvent } from "@mantine/hooks";
import { useEffect } from "react";
import useSettingsState from "../store/settings";
import useFileState from "../store/file";
import { Save, SaveAs } from "./FileOps";
import { appWindow } from "@tauri-apps/api/window";
import { ask as askDialog } from "@tauri-apps/api/dialog";
import { setStateFromJson } from "./SettingsOps";

export default function InitializeEditor() {
  const { setMac, setAppVersion, setTauriVersion } = useOSState();
  const { isSaved, filePath } = useFileState();
  const { settings } = useSettingsState();

  useEffect(() => {
    const getAppInfo = async () => {
      if (window.__TAURI_METADATA__) {
        // Check for Mac
        const type = await getType();
        if (type === "Darwin") {
          setMac(true);
        }
        setAppVersion(await getVersion());
        setTauriVersion(await getTauriVersion());
      }
    };
    getAppInfo();

    // check for unsaved file before closing app
    const onClose = async () => {
      await appWindow.onCloseRequested(async () => {
        if (!isSaved) {
          const response = await askDialog(
            "The current file is unsaved, do you want to save it first?",
            { title: "Warning", type: "warning" }
          );
          if (response) {
            filePath ? await Save() : await SaveAs();
          }
        }
      });
    };

    // read settings from json
    setStateFromJson();

    return () => {
      onClose();
    };
  }, []);

  // disable right click menu globally
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
    },
    { capture: true }
  );

  // for auto save interval
  const interval = useInterval(
    () => {
      const filePath = useFileState.getState().filePath;
      filePath && Save();
    },
    settings.autoSave && settings.saveInterval
      ? settings.saveInterval * 1000
      : 600000
  );
  useEffect(() => {
    settings.saveInterval ? interval.start() : interval.stop();
    return interval.stop;
  }, [settings.autoSave, settings.saveInterval]);

  // for auto save on blur
  useWindowEvent("blur", async () => {
    const filePath = useFileState.getState().filePath;

    if (settings.autoSave && settings.saveBlur && filePath) {
      Save();
    }
  });
}
