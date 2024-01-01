import useFileState from "@/store/file";
import useUIState from "@/store/ui";
import { OpenFolder, OpenPath } from "@/utils/fileOps";
import { Button } from "../ui/button";
import { FileIcon, FolderIcon } from "lucide-react";

// don't worry about responsive layouts for now, just
export default function Sidebar() {
  const { sidebarRef, isSidebarOpen } = useUIState();
  const { openFolder, filesInOpenFolder, filePath } = useFileState();

  if (isSidebarOpen) {
    if (openFolder && filesInOpenFolder) {
      let path = openFolder;
      let parts = path.split(/[\\\/]/);
      let lastPart = parts.pop();
      return (
        <div className="mt-5">
          <div className="flex items-center gap-1 pl-2">
            <FolderIcon strokeWidth={2.5} className="size-5" />
            <h1 className="font-medium truncate select-none">{lastPart}</h1>
          </div>
          {filesInOpenFolder.map((file) => (
            <div
              key={file.name}
              className={`${
                filePath === file.path
                  ? "bg-accent hover:bg-accent-hover"
                  : "hover:bg-accent"
              } my-1 mx-2 rounded-md px-2 py-1 cursor-pointer flex items-center gap-1`}
              onClick={() => OpenPath(file.path, true)}
            >
              <FileIcon className="size-4 shrink-0" />
              <p className="truncate">{file.name?.slice(0, -3)}</p>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="items-center justify-center text-center p-5">
        <Button className="w-full" onClick={() => OpenFolder()}>
          Open
        </Button>
      </div>
    );
  }
}
