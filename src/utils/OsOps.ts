import { type as getType } from "@tauri-apps/api/os";
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import { useAsyncEffect } from "ahooks";
import useOSStore from "../store/os";

export default function GetOsInfo() {
  const { setMac, setAppVersion, setTauriVersion } = useOSStore();
  useAsyncEffect(async () => {
    // Check for Mac
    const type = await getType();
    if (type === "Darwin") {
      setMac(true);
    }
    setAppVersion(await getVersion());
    setTauriVersion(await getTauriVersion());
  }, []);
}
