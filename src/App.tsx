import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MdEditor from "./components/Editor";
import TitleBar from "./components/TitleBar";
import useFileState from "./store/file";
import Init from "./utils/init";
import UseKeybinds from "./utils/keybinds";
import About from "./components/Dialogs/Pages/About";
import Settings from "./components/Dialogs/Pages/Settings";
import EditorContextMenu from "./components/Editor/EditorContextMenu";
import CommandPalette from "./components/Dialogs/CommandPalette";
import useSettingsState from "./store/settings";
import Sidebar from "./components/Sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ImperativePanelHandle } from "react-resizable-panels";
import useUIState from "./store/ui";

export default function App() {
  const mdEditorRef = useRef(null);
  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const { setEditorRef } = useFileState();
  const { settings } = useSettingsState();
  const { setSidebarRef, isSidebarOpen, setSidebarOpen } = useUIState();

  useEffect(() => {
    if (mdEditorRef.current) {
      setEditorRef(mdEditorRef.current);
    }
    if (sidebarRef.current) {
      setSidebarRef(sidebarRef.current);
    }
  }, []);

  Init();
  UseKeybinds();
  return (
    <div>
      <TitleBar />
      <CommandPalette />
      {/* TODO will want to wrap the sidebar in a separate context menu provider */}
      <ResizablePanelGroup direction="horizontal" autoSaveId="sidebar">
        <ResizablePanel
          id="sidebar-panel"
          className="sidebar"
          ref={sidebarRef}
          defaultSize={25}
          minSize={10}
          maxSize={30}
          collapsible
          collapsedSize={1}
          onResize={(width) => {
            if (width < 10) {
              setSidebarOpen(false);
            } else if (!isSidebarOpen) {
              setSidebarOpen(true);
            }
          }}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <MdEditor ref={mdEditorRef} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <About />
      <Settings />
      <Toaster richColors closeButton position="bottom-right" />
    </div>
  );
}
