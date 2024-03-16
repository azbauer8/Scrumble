import useUIStore from "@/store/uiStore"
import cn from "@/utils/cn"
import { ActionIcon, rem } from "@mantine/core"
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
      <IconChevronLeft
        className={cn("scale-0 transition-all", sidebarOpen && "scale-100")}
        style={{ width: rem(18), height: rem(18), strokeWidth: 2.5 }}
      />
      <IconChevronRight
        className={cn(
          "absolute scale-100 transition-all",
          sidebarOpen && "scale-0",
        )}
        style={{ width: rem(18), height: rem(18), strokeWidth: 2.5 }}
      />
    </ActionIcon>
  )
}
