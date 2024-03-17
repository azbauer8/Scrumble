import useFileStore from "@/store/fileStore"
import { IconClipboard, IconCopy, IconCut } from "@tabler/icons-react"
import type { ContextMenuContent } from "mantine-contextmenu"

const editorCtxItems: ContextMenuContent = [
  {
    key: "cut",
    icon: <IconCut size={16} />,
    title: "Cut",
    onClick: () =>
      // navigator.clipboard.writeText(window.getSelection()?.toString() ?? ""),
      document.execCommand("cut"),
  },
  {
    key: "copy",
    icon: <IconCopy size={16} />,
    title: "Copy",
    onClick: () =>
      // navigator.clipboard.writeText(window.getSelection()?.toString() ?? ""),
      document.execCommand("copy"),
  },
  {
    key: "paste",
    icon: <IconClipboard size={16} />,
    title: "Paste",
    onClick: async () => {
      const text = await navigator.clipboard.readText()
      const editor = useFileStore.getState().editor
      editor?.commands.insertContent(text)
    },
  },
]

export default editorCtxItems
