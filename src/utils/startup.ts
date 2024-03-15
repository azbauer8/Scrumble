import useFileStore from "@/store/fileStore"
import { ask } from "@tauri-apps/api/dialog"
import { appWindow } from "@tauri-apps/api/window"
import { useEffect } from "react"
import { saveFile, saveFileAs } from "./fileOps"
import addKeymap from "./keymap"

export default function startup() {
  const { isSaved, filePath } = useFileStore()
  addKeymap()

  useEffect(() => {
    // check for unsaved file before closing app
    const onClose = async () => {
      await appWindow.onCloseRequested(async () => {
        if (!isSaved) {
          const response = await ask(
            "The current file is unsaved, do you want to save it first?",
            { title: "Warning", type: "warning" },
          )
          if (response) {
            filePath ? await saveFile() : await saveFileAs()
          }
        }
      })
    }

    return () => {
      onClose()
    }
  }, [])
}
