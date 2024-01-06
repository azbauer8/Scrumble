import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import useFileState from "@/store/file";
import { open } from "@tauri-apps/api/shell";

export default function SidebarContextMenu() {
  return <ContextMenuContent className="bg-background"></ContextMenuContent>;
}
