import useUIStore from "@/store/uiStore"
import cn from "@/utils/cn"
import { ActionIcon } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

export default function SidebarToggle() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
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
  )
}
