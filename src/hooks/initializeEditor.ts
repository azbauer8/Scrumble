import { invoke } from "@tauri-apps/api/tauri";
import { type as getType } from "@tauri-apps/api/os";
import { useAsyncEffect } from "ahooks";
import useUIState from "../store/ui";
import useFileState from "../store/file";
export default function InitializeEditor() {
  useAsyncEffect(async () => {
    const { setMac } = useUIState();
    const { setFilePath } = useFileState();
    // Check for Mac
    const type = await getType();
    if (type === "Darwin") {
      setMac(true);
    }

    const args: string[] = await invoke("get_args");
    if (args.length > 1) setFilePath(args[1]);
  }, []);
}
