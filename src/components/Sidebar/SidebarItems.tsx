import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import useFileState from "@/store/file";
import { OpenPath } from "@/utils/fileOps";
import { ChevronsUpDownIcon, FileIcon, FolderIcon } from "lucide-react";

import SidebarContextMenu from "./SidebarContextMenu";
import "./sidebar.css";

export function SidebarParentFolder({
  name,
  path,
  setIsEditingFiles,
}: {
  name: string;
  path: string;
  setIsEditingFiles: (
    value: React.SetStateAction<Record<string, boolean>>,
  ) => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="sidebar-item flex select-none items-center gap-1.5 pl-2">
          <FolderIcon strokeWidth={2.5} className="size-5" />
          <h1 className=" truncate font-medium">{name}</h1>
        </div>
      </ContextMenuTrigger>
      <SidebarContextMenu
        type="sidebar"
        path={path}
        setIsEditing={() =>
          setIsEditingFiles((prevState) => ({
            ...prevState,
            [path]: true,
          }))
        }
      />
    </ContextMenu>
  );
}

export function SidebarFolder({
  name,
  path,
  isEditingFiles,
  setIsEditingFiles,
}: {
  name: string;
  path: string;
  isEditingFiles: Record<string, boolean>;
  setIsEditingFiles: (
    value: React.SetStateAction<Record<string, boolean>>,
  ) => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="folder">
        <div className="sidebar-item mx-2 my-1 flex cursor-pointer select-none items-center justify-between rounded-md px-2 py-1">
          <div className="flex items-center gap-1.5">
            <FolderIcon strokeWidth={2.5} className="size-5" />
            {isEditingFiles[path] ? (
              <input
                type="text"
                className="w-full bg-transparent text-sm outline-none"
                defaultValue={name}
                onBlur={() =>
                  setIsEditingFiles((prev) => ({
                    ...prev,
                    [path]: false,
                  }))
                }
              />
            ) : (
              <h2 className="select-none truncate font-medium">{name}</h2>
            )}
          </div>
          <ChevronsUpDownIcon className="size-5" />
        </div>
      </ContextMenuTrigger>
      <SidebarContextMenu
        type="folder"
        path={path}
        setIsEditing={() =>
          setIsEditingFiles((prevState) => ({
            ...prevState,
            [path]: true,
          }))
        }
      />
    </ContextMenu>
  );
}

export function SidebarItem({
  className,
  name,
  path,
  isEditingFiles,
  setIsEditingFiles,
}: {
  className?: string;
  name: string;
  path: string;
  isEditingFiles: Record<string, boolean>;
  setIsEditingFiles: (
    value: React.SetStateAction<Record<string, boolean>>,
  ) => void;
}) {
  const { filePath } = useFileState();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={`${
            filePath === path
              ? "bg-accent hover:bg-accent-hover"
              : "hover:bg-accent"
          } sidebar-item mx-2 my-1 flex items-center gap-2 rounded-md px-2 py-1 ${className}`}
          onClick={() => OpenPath(path, true)}
        >
          <FileIcon className="size-4 shrink-0" />
          {isEditingFiles[path] ? (
            <input
              type="text"
              className="w-full bg-transparent text-sm outline-none"
              defaultValue={name}
              onBlur={() =>
                setIsEditingFiles((prev) => ({
                  ...prev,
                  [path]: false,
                }))
              }
            />
          ) : (
            <p className="cursor-pointer select-none truncate">{name}</p>
          )}
        </div>
      </ContextMenuTrigger>
      <SidebarContextMenu
        type="file"
        path={path}
        setIsEditing={() =>
          setIsEditingFiles((prevState) => ({
            ...prevState,
            [path]: true,
          }))
        }
      />
    </ContextMenu>
  );
}
