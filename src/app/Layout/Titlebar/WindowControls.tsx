import { ask } from "@tauri-apps/api/dialog"
import { appWindow } from "@tauri-apps/api/window"

import useFileStore from "@/store/fileStore"
import { saveFile, saveFileAs } from "@/utils/fileOps"
import { Button } from "@mantine/core"
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react"

export default function WindowControls() {
  const { isSaved, filePath } = useFileStore()

  return (
    <div className="flex items-center">
      <Button
        variant="subtle"
        color="gray"
        className="rounded-none"
        onClick={async () => {
          await appWindow.minimize()
        }}
        tabIndex={-1}
      >
        <IconMinus className="size-4" />
      </Button>
      <Button
        variant="subtle"
        color="gray"
        className="rounded-none"
        onClick={async () => {
          await appWindow.toggleMaximize()
        }}
        tabIndex={-1}
      >
        <IconSquare className="size-4" />
      </Button>
      <Button
        variant="subtle"
        color="gray"
        className="rounded-none hover:bg-[#e81022b9]"
        onClick={async () => {
          await HandleClose()
        }}
        tabIndex={-1}
      >
        <IconX className="size-5" />
      </Button>
    </div>
  )

  async function HandleClose() {
    if (!isSaved) {
      const response = await ask(
        "The current file is unsaved, do you want to save it first?",
        { title: "Warning", type: "warning" },
      )
      if (response) {
        filePath ? await saveFile() : await saveFileAs()
      }
    }
    await appWindow.close()
  }
}
