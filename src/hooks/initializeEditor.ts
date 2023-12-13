import { invoke } from "@tauri-apps/api/tauri";
import { type as getType } from "@tauri-apps/api/os";
import { useInterval, useEventListener, useAsyncEffect } from "ahooks";

import { useAtom } from "jotai";
import { userSettings } from "../globalState/settings";
import { currentFile, isSaved, isSaving } from "../globalState/file";
import { isMac } from "../globalState/ui";

export default function InitializeEditor() {
  const [filePath, setFilePath] = useAtom(currentFile);
  const [saved] = useAtom(isSaved);
  const [saving, setSaving] = useAtom(isSaving);
  const [settings] = useAtom(userSettings);
  const [, setIsMac] = useAtom(isMac);

  useAsyncEffect(async () => {
    // Check for Mac
    const type = await getType();
    if (type === "Darwin") {
      setIsMac(true);
    }

    const args: string[] = await invoke("get_args");
    if (args.length > 1) setFilePath(args[1]);
  }, []);

  // auto save
  useInterval(
    async () => {
      if (filePath === null || saved || saving) return;
      setSaving(true);
    },
    settings.autoSave ? settings.saveInterval * 1000 : -1
  );

  // Save when editor blurred
  useEventListener("blur", async () => {
    if (!settings.saveBlur || filePath === null || saved || saving) return;
    setSaving(true);
  });
}
