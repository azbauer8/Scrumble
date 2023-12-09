import useGlobalStore from "./globalStore";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { openFile, saveFile, saveFileAs } from "./fileOps";

export default function MenuListener() {
  const { markdown, setMarkdown, setFileOpened, savePath, setSavePath } =
    useGlobalStore();
  const [menuPayload, setMenuPayload] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    listen("menu-event", (e) => {
      setMenuPayload(e.payload as any);
      setMenuOpen(true);
    });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      switch (menuPayload) {
        case "open-event":
          openFile(setMarkdown, setSavePath, setFileOpened);
          break;
        case "save-event":
          saveFile(markdown, savePath, setSavePath);
          break;
        case "save_as-event":
          saveFileAs(markdown, setSavePath);
          break;

        default:
          break;
      }
      setMenuOpen(false);
    }
  }, [menuOpen]);
}
