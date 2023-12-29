import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MdEditor from "./components/Editor";
import TitleBar from "./components/TitleBar";
import useFileState from "./store/file";
import Init from "./utils/init";
import UseKeybinds from "./utils/keybinds";
import About from "./components/OverlayPages/About";
import Settings from "./components/OverlayPages/Settings";
import EditorContextMenu from "./components/Editor/ContextMenu";

export default function App() {
  const mdEditorRef = useRef(null);
  const { setEditorRef } = useFileState();

  useEffect(() => {
    if (mdEditorRef.current) {
      setEditorRef(mdEditorRef.current);
    }
  }, []);

  Init();
  UseKeybinds();
  return (
    <div>
      <TitleBar />
      <ContextMenu>
        <ContextMenuTrigger>
          <MdEditor ref={mdEditorRef} />
        </ContextMenuTrigger>
        <EditorContextMenu />
      </ContextMenu>
      <About />
      <Settings />
      <Toaster richColors closeButton position="bottom-right" />
    </div>
  );
}
