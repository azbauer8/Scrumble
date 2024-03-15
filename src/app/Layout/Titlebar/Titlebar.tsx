import useUIStore from "@/store/uiStore"
import cn from "@/utils/cn"
import { AppShell } from "@mantine/core"
import ActiveFile from "./ActiveFile"
import SidebarToggle from "./SidebarToggle"
import WindowControls from "./WindowControls"

export default function Titlebar() {
  const { isMac } = useUIStore()

  if (isMac)
    return (
      <AppShell.Header
        data-tauri-drag-region
        className="flex items-center justify-between pl-[70px] pr-3"
      >
        <SidebarToggle />
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
        <ActiveFile />
      </div>
      <WindowControls />
    </AppShell.Header>
  )
}
