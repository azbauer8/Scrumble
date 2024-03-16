import useUIStore from "@/store/uiStore"
import cn from "@/utils/cn"
import startup from "@/utils/startup"
import { AppShell } from "@mantine/core"
import { IconDotsVertical } from "@tabler/icons-react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Editor from "../Editor/MdEditor"
import Sidebar from "../Sidebar/Sidebar"
import Titlebar from "./Titlebar/Titlebar"

export default function AppLayout() {
  startup()

  const { sidebarOpen, sidebarWidth, setSidebarWidth } = useUIStore()
  return (
    <AppShell
      header={{ height: 36 }}
      classNames={{
        header: "bg-transparent border-b-0",
        navbar: "bg-transparent border-r-0 pl-2.5 pb-2.5",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Titlebar />

      <AppShell.Main>
        <PanelGroup direction="horizontal">
          {sidebarOpen && (
            <>
              <Panel
                id="sidebar-wrapper"
                minSize={10}
                maxSize={50}
                defaultSize={sidebarWidth}
                onResize={(size) => setSidebarWidth(size)}
                order={1}
                className="ml-2.5 rounded-md bg-neutral-800/50"
              >
                <Sidebar />
              </Panel>
              <PanelResizeHandle className="group flex items-center">
                <IconDotsVertical className="mx-[1px] h-8 w-4 rounded-md group-hover:bg-neutral-700/35" />
              </PanelResizeHandle>
            </>
          )}
          <Panel
            id="main"
            minSize={25}
            order={2}
            className={cn("mr-2.5 rounded-md", !sidebarOpen && "ml-2.5")}
          >
            <Editor />
          </Panel>
        </PanelGroup>
      </AppShell.Main>
    </AppShell>
  )
}
