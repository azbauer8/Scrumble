import useFileStore from "@/store/fileStore"
import useSettingsStore from "@/store/settingsStore"
import { useInterval, useWindowEvent } from "@mantine/hooks"
import { useEffect } from "react"
import { saveFile } from "./fileOps"

export default function addAutoSave() {
  const { settings } = useSettingsStore()

  // for auto save interval
  let saveInterval = 600000
  if (settings.autoSave && settings.saveInterval) {
    const settingsInterval =
      typeof settings.saveInterval === "string"
        ? Number.parseInt(
            settings.saveInterval === "" ? "60" : settings.saveInterval,
          )
        : settings.saveInterval
    saveInterval = settingsInterval * 1000
  }
  const interval = useInterval(
    () => (useFileStore.getState().filePath ? saveFile() : null),
    saveInterval,
  )

  useEffect(() => {
    settings.saveInterval ? interval.start() : interval.stop()
    return interval.stop
  }, [settings.autoSave, settings.saveInterval])

  // for auto save on blur
  useWindowEvent("blur", async () => {
    const filePath = useFileStore.getState().filePath

    if (settings.autoSave && settings.saveBlur && filePath) {
      saveFile()
    }
  })
}
