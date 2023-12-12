import { invoke } from "@tauri-apps/api/tauri";
import { version as getVersion, type as getType } from "@tauri-apps/api/os";
import { useEffect } from "react";
import { useInterval, useEventListener, useAsyncEffect } from "ahooks";

import { useAtom } from "jotai";
import { userSettings } from "../globalState/settings";
import { currentFile, isSaved, isSaving } from "../globalState/file";
import { vibrancyConfig } from "../globalState/ui";

export default function InitializeEditor() {
  const [filePath, setFilePath] = useAtom(currentFile);
  const [saved] = useAtom(isSaved);
  const [saving, setSaving] = useAtom(isSaving);
  const [settings] = useAtom(userSettings);
  const [, setVibrancy] = useAtom(vibrancyConfig);

  // sets vibrancy compatiblity based on os type
  useAsyncEffect(async () => {
    // Detect system type
    const type = await getType();
    if (type === "Linux") return;

    const version = await getVersion();
    if (type === "Windows_NT") {
      const buildNumber = parseInt(
        version.substring(version.lastIndexOf(".") + 1)
      );
      if (buildNumber >= 21996) {
        // Windows 11
        setVibrancy({
          acrylic: true,
          mica: true,
          vibrancy: false,
        });
      } else if (buildNumber >= 17134) {
        // Windows 10 1803
        setVibrancy({
          acrylic: true,
          mica: false,
          vibrancy: false,
        });
      }
    } else {
      /*
       * FluentUI doesn't work on macOS 11.3 - (Safari 14.1 -)
       * For vibrancy feature(macOS 10.14 +), there's no need to detect version.
       */
      setVibrancy({
        acrylic: false,
        mica: false,
        vibrancy: true,
      });
    }

    const args: string[] = await invoke("get_args");
    if (args.length > 1) setFilePath(args[1]);
  }, []);

  // apply vibrancy on settings change
  useEffect(() => {
    if (settings.vibrancy !== "Default") {
      invoke(`apply_${settings.vibrancy.toLowerCase()}`);
    }
  }, [settings.vibrancy]);

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
