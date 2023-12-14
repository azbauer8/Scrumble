import { invoke } from "@tauri-apps/api/tauri";
import { type as getType } from "@tauri-apps/api/os";
import { useInterval, useEventListener, useAsyncEffect } from "ahooks";

import { useAtom } from "jotai";
import { userSettingsState } from "../globalState/settings";
import {
  currentFileState,
  isSavedState,
  isSavingState,
} from "../globalState/file";
import { isMacState } from "../globalState/ui";

export default function InitializeEditor() {
  const [currentFile, setCurrentFile] = useAtom(currentFileState);
  const [isSaved] = useAtom(isSavedState);
  const [isSaving, setSaving] = useAtom(isSavingState);
  const [userSettings] = useAtom(userSettingsState);
  const [, setIsMac] = useAtom(isMacState);

  useAsyncEffect(async () => {
    // Check for Mac
    const type = await getType();
    if (type === "Darwin") {
      setIsMac(true);
    }

    const args: string[] = await invoke("get_args");
    if (args.length > 1) setCurrentFile(args[1]);
  }, []);

  // auto save
  useInterval(
    async () => {
      if (currentFile === null || isSaved || isSaving) return;
      setSaving(true);
    },
    userSettings.autoSave ? userSettings.saveInterval * 1000 : -1
  );

  // Save when editor blurred
  useEventListener("blur", async () => {
    if (!userSettings.saveBlur || currentFile === null || isSaved || isSaving)
      return;
    setSaving(true);
  });
}
