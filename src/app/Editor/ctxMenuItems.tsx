import { IconCopy } from "@tabler/icons-react"
import type { ContextMenuContent } from "mantine-contextmenu"

const editorCtxItems: ContextMenuContent = [
  {
    key: "copy",
    icon: <IconCopy size={16} />,
    title: "Copy to clipboard",
    onClick: () =>
      navigator.clipboard.writeText(window.getSelection()?.toString() ?? ""),
  },
]

export default editorCtxItems
