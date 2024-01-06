import useFileState from "@/store/file";
import useUIState from "@/store/ui";
import { OpenFolder, OpenPath } from "@/utils/fileOps";
import { FileIcon, FolderIcon } from "lucide-react";

import { Button } from "../ui/button";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import SidebarContextMenu from "./SidebarContextMenu";

// don't worry about responsive layouts for now, just
export default function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useUIState();
  const { openFolder, filesInOpenFolder, filePath } = useFileState();

  if (isSidebarOpen) {
    if (openFolder && filesInOpenFolder) {
      let path = openFolder;
      let parts = path.split(/[\\\/]/);
      let lastPart = parts.pop();
      console.log(filesInOpenFolder);
      return (
        <div className="mt-5">
          <div className="flex items-center gap-1 pl-2 ">
            <FolderIcon strokeWidth={2.5} className="size-5" />
            <h1 className="cursor-pointer select-none truncate font-medium">
              {lastPart}
            </h1>
          </div>
          {filesInOpenFolder.map((file) =>
            file.path.slice(-3) === ".md" ? (
              <ContextMenu key={file.path}>
                <ContextMenuTrigger>
                  <div
                    className={`${
                      filePath === file.path
                        ? "bg-accent hover:bg-accent-hover"
                        : "hover:bg-accent"
                    } sidebar-item mx-2 my-1 flex cursor-pointer select-none items-center gap-1 rounded-md px-2 py-1`}
                    onClick={() => OpenPath(file.path, true)}
                  >
                    <FileIcon className="size-4 shrink-0" />
                    <p className="truncate">{file.name?.slice(0, -3)}</p>
                  </div>
                </ContextMenuTrigger>
                {/* <SidebarContextMenu /> */}
              </ContextMenu>
            ) : file.children ? (
              <>
                <div className="sidebar-item mx-2 my-1 flex cursor-pointer select-none items-center gap-1 rounded-md px-2 py-1">
                  <FolderIcon strokeWidth={2.5} className="size-5" />
                  <h2
                    key={file.path}
                    className="select-none truncate font-medium"
                  >
                    {file.name}
                  </h2>
                </div>
                {file.children.map(
                  (child) =>
                    child.path.slice(-3) === ".md" && (
                      <ContextMenu key={child.path}>
                        <ContextMenuTrigger>
                          <div
                            className={`${
                              filePath === child.path
                                ? "bg-accent hover:bg-accent-hover"
                                : "hover:bg-accent"
                            } sidebar-item mx-2 my-1 flex cursor-pointer select-none items-center gap-1 rounded-md py-1 pl-6`}
                            onClick={() => OpenPath(child.path, true)}
                          >
                            <FileIcon className="size-4 shrink-0" />
                            <p className="truncate">
                              {child.name?.slice(0, -3)}
                            </p>
                          </div>
                        </ContextMenuTrigger>
                        {/* <SidebarContextMenu /> */}
                      </ContextMenu>
                    ),
                )}
              </>
            ) : null,
          )}
        </div>
      );
    }
    return (
      <div className="items-center justify-center p-5 text-center">
        <Button className="w-full" onClick={() => OpenFolder()}>
          Open
        </Button>
      </div>
    );
  }
}
