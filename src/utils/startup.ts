import useFileStore from "@/store/fileStore"
import useUIStore from "@/store/uiStore"
import { ask } from "@tauri-apps/api/dialog"
import { type as getType } from "@tauri-apps/api/os"
import { appWindow } from "@tauri-apps/api/window"
import { useEffect } from "react"
import { saveFile, saveFileAs } from "./fileOps"
import addKeymap from "./keymap"

export default function startup() {
  const { isSaved, filePath } = useFileStore()
  const { setMac } = useUIStore()
  addKeymap()

  useEffect(() => {
    const getAppInfo = async () => {
      if (window.__TAURI_METADATA__) {
        const type = await getType()
        if (type === "Darwin") {
          setMac(true)
        }
      }
    }
    getAppInfo()

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
