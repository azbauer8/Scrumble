import useFileStore from "@/store/fileStore"
import useUIStore from "@/store/uiStore"
import cn from "@/utils/cn"
import { ActionIcon, AppShell, Badge } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import WindowControls from "./WindowControls"

export default function Titlebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const { isSaved, fileName } = useFileStore()

  return (
    <AppShell.Header
      data-tauri-drag-region
      className="flex items-center justify-between pl-3"
    >
      <div className="flex items-center gap-1.5">
        <ActionIcon
          size="sm"
          variant="outline"
          color="gray"
          radius="sm"
          className="border-neutral-600/45 bg-neutral-700/25"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <IconChevronRight
            className={cn(
              "size-[1.2rem] scale-0 transition-all",
              sidebarOpen && "scale-100",
            )}
          />
          <IconChevronLeft
            className={cn(
              "absolute size-[1.2rem] scale-100 transition-all",
              sidebarOpen && "scale-0",
            )}
          />
        </ActionIcon>
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
      </div>
      <WindowControls />
    </AppShell.Header>
  )
}
