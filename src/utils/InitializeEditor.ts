import { type as getType } from "@tauri-apps/api/os";
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import { useAsyncEffect } from "ahooks";
import useOSState from "../store/os";
import { useInterval, useWindowEvent } from "@mantine/hooks";
import { useEffect } from "react";
import useSettingsState from "../store/settings";
import useFileState from "../store/file";
import { Save } from "./FileOps";

export default function InitializeEditor() {
  const { setMac, setAppVersion, setTauriVersion } = useOSState();
  useAsyncEffect(async () => {
    // Check for Mac
    const type = await getType();
    if (type === "Darwin") {
      setMac(true);
    }
    setAppVersion(await getVersion());
    setTauriVersion(await getTauriVersion());
  }, []);

  const { settings } = useSettingsState();

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
