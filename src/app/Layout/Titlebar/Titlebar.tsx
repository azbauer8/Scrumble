import useUIStore from "@/store/uiStore"
import { ActionIcon, AppShell } from "@mantine/core"
import { IconMenu } from "@tabler/icons-react"
import ActiveFile from "./ActiveFile"
import TitlebarMenu from "./Menu"
import SidebarToggle from "./SidebarToggle"
import WindowControls from "./WindowControls"

export default function Titlebar() {
  const { isMac } = useUIStore()

  if (isMac)
    return (
      <AppShell.Header
        data-tauri-drag-region
        className="flex items-center justify-end gap-1.5 pr-3 pl-[70px]"
      >
        <SidebarToggle />
        <ActionIcon
          size="sm"
          variant="outline"
          color="gray"
          radius="sm"
          className="border-neutral-600/45 bg-neutral-700/25"
        >
          <IconMenu className="size-[1.2rem]" />
        </ActionIcon>
        <ActiveFile />
      </AppShell.Header>
    )

  return (
    <AppShell.Header
      data-tauri-drag-region
      className="flex items-center justify-between pl-3"
    >
      <div className="flex items-center gap-1.5">
        <SidebarToggle />
        <TitlebarMenu />
        <ActiveFile />
      </div>
      <WindowControls />
    </AppShell.Header>
  )
}
