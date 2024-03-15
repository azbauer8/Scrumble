import useFileStore from "@/store/fileStore"
import { Badge } from "@mantine/core"

export default function ActiveFile() {
  const { isSaved, fileName } = useFileStore()
  return (
    <Badge
      data-tauri-drag-region
      variant="dot"
      color={isSaved ? "green" : "yellow"}
      radius="sm"
      className="h-[22px] cursor-default select-none bg-neutral-700/25"
    >
      <p className="truncate font-normal text-sm normal-case">
        {fileName !== "" ? fileName : "Untitled"}
      </p>
    </Badge>
  )
}
